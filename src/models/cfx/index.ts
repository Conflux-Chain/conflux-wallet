import confluxWeb from '@/vendor/conflux-web'
const namespace = 'cfx'
const maxInterval = 1000 * 60 * 10
/* Max gas for send transaction (not gas price) */
export const maxGasForCfxSend = 25000
const nonceLocalStoragePrefix = 'cfx_address_'
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
  },
  effects: {
    /**更新cfx余额 */
    *updateCfxBalance(_, { call, put, select }) {
      try {
        const { currentAccountAddress } = select(state => state[namespace])
        const cfxBalance = yield call(confluxWeb.cfx.getBalance, currentAccountAddress)
        yield put({
          type: 'setState',
          payload: {
            cfxBalance,
          },
        })
      } catch (e) {
        // 获取失败
      }
    },
    /**send操作 */
    *send({ payload }, { call, put, select }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            cfxSending: true,
          },
        })
        const { currentAccountAddress } = select(state => state[namespace])
        // view层传过来的数据
        const { toAddress, sendAmount, gasPrice } = payload
        // ========nonce参数获取========
        const params = {
          currentAccountAddress,
          localStorageKey: `${nonceLocalStoragePrefix}${currentAccountAddress}`,
        }
        const nonce = yield call(getActualNoncePromise, params)
        const config = {
          from: currentAccountAddress,
          to: toAddress,
          value: sendAmount,
          gas: maxGasForCfxSend,
          gasPrice,
          nonce,
        }
        const hash = yield call(sendTransactionPromise, config)
        yield put({
          type: 'setState',
          payload: {
            cfxSendSuccessed: true,
            lastCfxSendSuccessHash: hash,
          },
        })
      } catch (e) {
        yield put({
          type: 'setState',
          payload: {
            cfxSendFailed: true,
          },
        })
      } finally {
        yield put({
          type: 'setState',
          payload: {
            cfxSending: false,
          },
        })
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}

function sendTransactionPromise(config) {
  return new Promise((relsove: (value: string) => void, reject) => {
    confluxWeb.cfx.sendTransaction(config, (err, hash) => {
      if (err !== null) {
        return reject(err)
      } else {
        return relsove(hash)
      }
    })
  })
}
function getNoncePromise(fromAddress) {
  // 获取最新的 nonce
  return new Promise((resolve: (value: number) => void, reject) => {
    confluxWeb.cfx.getTransactionCount(fromAddress, (err, count) => {
      if (err !== null) {
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
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ nonce: nonce + 1, updateTime: +new Date() })
    )
    return nonce
  } catch (e) {
    throw new Error(e)
  }
}
