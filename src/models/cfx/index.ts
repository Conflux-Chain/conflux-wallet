import confluxWeb from '@/vendor/conflux-web'
import { sendSignedTransactionPromise, toFixedForDisplay } from '../fc'
import Axios from 'axios'
const namespace = 'cfx'
const maxInterval = 1000 * 60 * 10
/* Max gas for send transaction (not gas price) */
export const maxGasForSend = 10000000
export const nonceLocalStoragePrefix = 'cfx_address_'
export { namespace }
export default {
  namespace,
  state: {
    /**当前登陆的账户地址 */
    currentAccountAddress: '',
    /**当前登陆的private key*/
    currentAccountPrivateKey: '',
    /** cfx余额 */
    cfxBalance: 0,
    /**最新转账成功的hash */
    lastCfxSendSuccessHash: '',
    /** cfx开始send */
    cfxSending: false,
    /** cfx send成功 */
    cfxSendSuccessed: false,
    /** cfx send失败 */
    cfxSendFailed: false,
    /** 水龙头获取cfx失败*/
    getCfxSuccess: false,
    /**获取水龙头成功后的tx */
    cfxTx: '',
  },
  effects: {
    /**更新cfx余额 */
    *updateCfxBalance(_, { call, put, select }) {
      try {
        const { currentAccountAddress } = yield select(state => state[namespace])
        const cfxBalance = yield call(confluxWeb.cfx.getBalance, currentAccountAddress)
        yield put({
          type: 'setState',
          payload: {
            cfxBalance: toFixedForDisplay(cfxBalance / 10 ** 18),
          },
        })
      } catch (e) {
        // 获取失败
      }
    },
    /**send操作 */
    *send({ payload, callback, errCallback }, { call, put, select }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            cfxSending: true,
          },
        })
        const { currentAccountAddress } = yield select(state => state[namespace])
        // view层传过来的数据
        const { toAddress, sendAmount, gasPrice } = payload
        // ========nonce参数获取========
        const params = {
          currentAccountAddress,
          localStorageKey: `${nonceLocalStoragePrefix}${currentAccountAddress}`,
        }
        const nonce = yield call(getActualNoncePromise, params)
        const newValue = sendAmount * 10 ** 18
        const hexStr = `0x${newValue.toString(16)}`
        const txParams = {
          from: 0,
          nonce,
          gasPrice,
          gas: maxGasForSend,
          value: hexStr,
          to: toAddress,
        }
        const hash = yield call(sendSignedTransactionPromise, txParams)
        // tslint:disable-next-line: no-console
        console.log('hash: ' + hash)
        successedSendActionSetNonce(params.localStorageKey, nonce)
        yield put({
          type: 'setState',
          payload: {
            cfxSendSuccessed: true,
            lastCfxSendSuccessHash: hash,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof callback === 'function' && callback()
      } catch (e) {
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback(e.message)
        yield put({
          type: 'setState',
          payload: {
            cfxSendFailed: true,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback(e)
      } finally {
        yield put({
          type: 'setState',
          payload: {
            cfxSending: false,
          },
        })
      }
    },
    /**水龙头获取cfx */
    *getCfx({ payload, callback, errCallback }, { call, put }) {
      try {
        const { address } = payload
        const result = yield call(getCfx, address)
        const cfxTx = result.data.message.tx
        if (!cfxTx) {
          throw result.data.message
        }
        yield put({
          type: 'setState',
          payload: {
            getCfxSuccess: true,
            cfxTx,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof callback === 'function' && callback()
      } catch (e) {
        yield put({
          type: 'setState',
          payload: {
            cfxTx: '',
            getCfxSuccess: false,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback(e)
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}

function getNoncePromise(fromAddress) {
  // 获取最新的 nonce
  return new Promise((resolve: (value: number) => void, reject) => {
    confluxWeb.cfx.getTransactionCount(fromAddress, (err, count) => {
      if (err) {
        return reject(err)
      }
      return resolve(count)
    })
  })
}

export async function getActualNoncePromise({ currentAccountAddress, localStorageKey }) {
  try {
    // 这个 nonce 应该在第一次获取后缓存起来，以后每次交易 +1
    // 在发出一笔tx之后，从fullnode接受它到执行它会有延迟，大概一分钟左右。
    // 这个期间内，如果用户又发出了一笔交易的话，使用getTransactionCount作为nonce是不对的。
    let nonce = await getNoncePromise(currentAccountAddress)
    const localNonce = JSON.parse(localStorage.getItem(localStorageKey) || null)
    // getTransactionCount的nonce如果比 localStorage 里面的小，就用 localStorage 里面的，nonce用完一次就 +1
    // nonce 间隔，10分钟，判断两次获取交易的间隔时间，要是超过了十分钟，直接用远程的nonce
    if (
      localNonce &&
      +new Date() - +localNonce.updateTime < maxInterval &&
      localNonce.nonce >= nonce
    ) {
      // tslint:disable-next-line: no-console
      console.log('local nonce: %s VS remote nonce: %s', +localNonce.nonce, nonce)
      nonce = localNonce.nonce
    }

    return nonce
  } catch (e) {
    throw new Error(e)
  }
}

export function successedSendActionSetNonce(localStorageKey, nonce) {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ nonce: nonce + 1, updateTime: +new Date() })
  )
}
function getCfx(address: string) {
  return Axios.request({
    url: `/faucet/dev/ask?address=${address.toLocaleLowerCase()}`,
  })
}
