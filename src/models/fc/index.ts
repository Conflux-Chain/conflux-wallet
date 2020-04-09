import {
  namespace as namespaceOfCfx,
  getActualNoncePromise,
  // successedSendActionSetNonce,
  maxGasForSend,
  nonceLocalStoragePrefix,
} from '@/models/cfx'
import { cfx } from '@/vendor/conflux-web'
import config from '@/config'
// const nonceLocalStoragePrefix = 'fc_address_'
const namespace = 'fc'
export { namespace }
export default {
  namespace,
  state: {
    FC: null,
    /** 总数 */
    fcTotalBalance: 0,
    /** 可用数量 = fcPersonalFreeBalance+fcPersonalUnLockBalance */
    fcAvailableBalance: 0,
    /** Conflux转账池可用balance*/
    fcPersonalFreeBalance: 0,
    /** 个人转账池 = 通过fc数值计算得来 */
    fcPersonalUnLockBalance: 0,
    /** 个人锁定池的FC数量 通过stateOf函数直接获取 */
    fcPersonalLockBalance: 0,
    // ======send=======
    /** fc开始send */
    fcSending: false,
    /** fc send成功 */
    fcSendSuccessed: false,
    /** fc send失败 */
    fcSendFailed: false,
    /**最新转账成功的hash */
    lastFCSendSuccessHash: '',
  },
  effects: {
    *updateFCBalance(_, { call, put, select }) {
      try {
        const { currentAccountAddress: address } = yield select(state => state[namespaceOfCfx])
        const { FC } = yield select(state => state[namespace])
        const _ratio = yield call(getCirculationRatioPromise, { FC })
        const { '0': _c2PBalance, '1': _p2PBalance, '2': _lockBalance } = yield call(
          getFCStateOfPromise,
          {
            address,
            FC,
          }
        )
        const c2PBalance = transformReturnBalanceToNumber(_c2PBalance)
        const p2PBalance = transformReturnBalanceToNumber(_p2PBalance)
        const lockBalance = transformReturnBalanceToNumber(_lockBalance)
        // tslint:disable-next-line: radix
        const ratio = parseInt(_ratio.toString())
        const fcPersonalFreeBalance = c2PBalance
        const fcPersonalUnLockBalance = (p2PBalance * ratio) / (100 + ratio)
        // const fcPersonalUnLockBalance = p2PBalance.mul(ratio).div(100 + ratio)
        const fcPersonalLockBalance = lockBalance + (p2PBalance * 100) / (100 + ratio)
        // const fcPersonalLockBalance = lockBalance.add(p2PBalance.mul(100).div(100 + ratio))
        const fcAvailableBalance = fcPersonalFreeBalance + fcPersonalUnLockBalance
        // const fcAvailableBalance = fcPersonalFreeBalance.add(fcPersonalUnLockBalance)
        const fcTotalBalance = fcAvailableBalance + fcPersonalLockBalance
        // const fcTotalBalance = fcAvailableBalance.add(fcPersonalLockBalance)
        yield put({
          type: 'setState',
          payload: {
            fcPersonalFreeBalance: toFixedForDisplay(fcPersonalFreeBalance),
            fcPersonalUnLockBalance: toFixedForDisplay(fcPersonalUnLockBalance),
            fcPersonalLockBalance: toFixedForDisplay(fcPersonalLockBalance),
            fcAvailableBalance: toFixedForDisplay(fcAvailableBalance),
            fcTotalBalance: toFixedForDisplay(fcTotalBalance),
          },
        })
      } catch (e) {}
    },
    *send({ payload, callback, errCallback }, { call, put, select }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            fcSending: true,
          },
        })
        const { toAddress, value, gasPrice } = payload
        const { currentAccountAddress: fromAddress, currentAccountPrivateKey } = yield select(
          state => state[namespaceOfCfx]
        )
        const { FC } = yield select(state => state[namespace])
        const params = {
          currentAccountAddress: fromAddress,
          localStorageKey: `${nonceLocalStoragePrefix}${fromAddress}`,
        }
        const nonce = yield call(getActualNoncePromise, params)
        const newValue = value * 10 ** 18
        const hexStr = `0x${newValue.toString(16)}`
        const txParams = {
          from: cfx.Account(currentAccountPrivateKey),
          nonce,
          gasPrice,
          gas: maxGasForSend,
          value: 0,
          to: config.FCContractAddress,
          data: FC.methods.transfer(toAddress, hexStr).encodeABI(), // get data from ABI
        }
        const hash = yield call(sendSignedTransactionPromise, txParams)
        // tslint:disable-next-line: no-console
        console.log('fc send hash:' + hash)
        // successedSendActionSetNonce(params.localStorageKey, nonce)
        yield put({
          type: 'setState',
          payload: {
            lastFCSendSuccessHash: hash,
          },
        })
        yield put({
          type: 'setState',
          payload: {
            fcSendSuccessed: true,
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
            fcSendSuccessed: false,
            fcSendFailed: true,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback(e)
      } finally {
        yield put({
          type: 'setState',
          payload: {
            fcSending: false,
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

function getCirculationRatioPromise({ FC }) {
  return new Promise((resolve: (value: number) => void, reject) => {
    FC.methods
      .circulationRatio()
      .call()
      .then(result => {
        return resolve(result)
      })
      .catch(err => {
        return reject(new Error(err))
      })
  })
}

function getFCStateOfPromise({ address, FC }) {
  return new Promise((resolve: (value: []) => void, reject) => {
    FC.methods
      .stateOf(address)
      .call()
      .then(result => {
        return resolve(result)
      })
      .catch(err => {
        return reject(new Error(err))
      })
  })
}
export function sendSignedTransactionPromise(txParams) {
  return new Promise((resolve, reject) => {
    cfx
      .sendTransaction(txParams)
      .then(transactionHash => {
        return resolve(transactionHash)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

export function toFixedForDisplay(num) {
  return num.toFixed(4)
}
function transformReturnBalanceToNumber(balance) {
  const str = balance.toHexString().split('0x')[1]
  const value = parseInt(str, 16)
  const result = value / 10 ** 18
  return result || 0
}
