import { namespace as namespaceOfCfx, getActualNoncePromise } from '@/models/cfx'
import confluxWeb from '@/vendor/conflux-web'
export const maxGasForFCSend = 25000
const nonceLocalStoragePrefix = 'fc_address_'
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
        const ratio = yield call(getCirculationRatioPromise, { FC })
        const { '0': c2PBalance, '1': p2PBalance, '2': lockBalance } = yield call(
          getFCStateOfPromise,
          {
            address,
            FC,
          }
        )
        const fcPersonalFreeBalance = c2PBalance
        // const fcPersonalUnLockBalance = (p2PBalance * ratio) / (100 + ratio)
        const fcPersonalUnLockBalance = p2PBalance.mul(ratio).div(100 + ratio)
        // const fcPersonalLockBalance = lockBalance + (p2PBalance * 100) / (100 + ratio)
        const fcPersonalLockBalance = lockBalance.add(p2PBalance.mul(100).div(100 + ratio))
        // const fcAvailableBalance = fcPersonalFreeBalance + fcPersonalUnLockBalance
        const fcAvailableBalance = fcPersonalFreeBalance.add(fcPersonalUnLockBalance)
        // const fcTotalBalance = fcAvailableBalance + fcPersonalLockBalance
        const fcTotalBalance = fcAvailableBalance.add(fcPersonalLockBalance)
        yield put({
          type: 'setState',
          payload: {
            fcPersonalFreeBalance: fcPersonalFreeBalance.toNumber(),
            fcPersonalUnLockBalance: fcPersonalUnLockBalance.toNumber(),
            fcPersonalLockBalance: fcPersonalLockBalance.toNumber(),
            fcAvailableBalance: fcAvailableBalance.toNumber(),
            fcTotalBalance: fcTotalBalance.toNumber(),
          },
        })
      } catch (e) {}
    },
    *send({ payload }, { call, put, select }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            fcSending: true,
          },
        })
        const { toAddress, value, gasPrice } = payload
        const { currentAccountAddress: fromAddress } = yield select(state => state[namespaceOfCfx])
        const { FC } = yield select(state => state[namespace])
        const params = {
          currentAccountAddress: fromAddress,
          localStorageKey: `${nonceLocalStoragePrefix}${fromAddress}`,
        }
        const nonce = yield call(getActualNoncePromise, params)
        const txParams = {
          from: fromAddress,
          nonce,
          gasPrice,
          gas: maxGasForFCSend,
          value,
          to: toAddress,
          data: FC.methods.transfer(toAddress, value).encodeABI(), // get data from ABI
        }
        const hash = yield call(sendSignedTransactionPromise, txParams)
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
      } catch (e) {
        yield put({
          type: 'setState',
          payload: {
            fcSendSuccessed: false,
          },
        })
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
        return reject(err)
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
        return reject(err)
      })
  })
}
function sendSignedTransactionPromise(txParams) {
  return new Promise((resolve, reject) => {
    confluxWeb.cfx
      .signTransaction(txParams)
      .then((encodedTransaction: any) => {
        const { rawTransaction } = encodedTransaction
        confluxWeb.cfx
          .sendSignedTransaction(rawTransaction)
          .then(transactionHash => {
            return resolve(transactionHash)
          })
          .catch(err => {
            return reject(err)
          })
      })
      .catch(err => {
        return reject(err)
      })
  })
}
