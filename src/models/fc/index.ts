import {
  namespace as namespaceOfCfx,
  getActualNoncePromise,
  // successedSendActionSetNonce,
  maxGasForSend,
  maxStorage,
  nonceLocalStoragePrefix,
  successedSendActionSetNonce,
} from '@/models/cfx'
import { cfx } from '@/vendor/conflux-web'
import config from '@/config'
import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'
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
        // const _ratio = yield call(getCirculationRatioPromise, { FC })
        // const { '0': _c2PBalance, '1': _p2PBalance, '2': _lockBalance } = yield call(
        const { '0': _c2PBalance, '1': _p2PBalance } = yield call(getFCStateOfPromise, {
          address,
          FC,
        })
        const c2PBalance = transformReturnBalanceToNumber(_c2PBalance)
        const p2PBalance = transformReturnBalanceToNumber(_p2PBalance)
        // const lockBalance = transformReturnBalanceToNumber(_lockBalance)
        // tslint:disable-next-line: radix
        // const ratio = parseInt(_ratio.toString())
        const fcPersonalFreeBalance = c2PBalance + p2PBalance
        const fcPersonalUnLockBalance = 0 // (p2PBalance * ratio) / (100 + ratio)
        // const fcPersonalUnLockBalance = p2PBalance.mul(ratio).div(100 + ratio)
        const fcPersonalLockBalance = 0 // lockBalance + (p2PBalance * 100) / (100 + ratio)
        // const fcPersonalLockBalance = lockBalance.add(p2PBalance.mul(100).div(100 + ratio))
        const fcAvailableBalance = fcPersonalFreeBalance + fcPersonalUnLockBalance
        // const fcAvailableBalance = fcPersonalFreeBalance.add(fcPersonalUnLockBalance)
        const fcTotalBalance = fcAvailableBalance + fcPersonalLockBalance
        // const fcTotalBalance = fcAvailableBalance.add(fcPersonalLockBalance)
        yield put({
          type: 'setState',
          payload: {
            fcPersonalFreeBalance,
            fcPersonalUnLockBalance,
            fcPersonalLockBalance,
            fcAvailableBalance,
            fcTotalBalance,
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
        const localStorageKey = `${nonceLocalStoragePrefix}${fromAddress}`
        const params = {
          currentAccountAddress: fromAddress,
          localStorageKey,
        }
        const nonce = yield call(getActualNoncePromise, params)
        const newValue = new BigNumber(value).multipliedBy(10 ** 18)
        const hexStr = `0x${newValue.toString(16)}`
        const newGasPrice = new BigNumber(gasPrice).multipliedBy(10 ** 9)
        const hexGasPrice = `0x${newGasPrice.toString(16)}`
        const txParams = {
          from: cfx.Account(currentAccountPrivateKey),
          nonce,
          gasPrice: hexGasPrice,
          gas: maxGasForSend,
          value: 0,
          to: config.FCContractAddress,
          storageLimit: maxStorage, // get data from ABI
        }
        const hash = yield call(sendSignedTransactionPromise, txParams, localStorageKey, FC, {
          toAddress,
          value: hexStr,
        })
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

// function getCirculationRatioPromise({ FC }) {
//   return new Promise((resolve: (value: number) => void, reject) => {
//     FC.methods
//       .circulationRatio()
//       .call()
//       .then(result => {
//         return resolve(result)
//       })
//       .catch(err => {
//         return reject(new Error(err))
//       })
//   })
// }

function getFCStateOfPromise({ address, FC }) {
  return new Promise((resolve: (value: []) => void, reject) => {
    FC.stateOf(address)
      .then(result => {
        return resolve(result)
      })
      .catch(err => {
        return reject(new Error(err))
      })
  })
}
export function sendSignedTransactionPromise(txParams, localStorageKey, FC, data) {
  return new Promise((resolve, reject) => {
    const localNonce = JSON.parse(localStorage.getItem(localStorageKey) || null)
    let nonce = null
    if (localNonce && localNonce.nonce) {
      nonce = localNonce.nonce + 1
    }
    FC.transfer(data.toAddress, data.value)
      .sendTransaction(txParams)
      .then(transactionHash => {
        // jssdk return success will add nonce
        if (nonce) {
          successedSendActionSetNonce(localStorageKey, nonce)
        }
        return resolve(transactionHash)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

// export function toFixedForDisplay(num) {
//   return num.toFixed(4)
// }
function transformReturnBalanceToNumber(balance) {
  const value = JSBI.toNumber(balance)
  const result = value / 10 ** 18
  return result || 0
}
