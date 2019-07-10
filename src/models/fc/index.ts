import { namespace as namespaceOfCfx } from '@/models/cfx'
import confluxWeb from '@/vendor/conflux-web'
export const maxGasForFCSend = 25000
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
    /** cfx开始send */
    cfxSending: false,
    /** cfx send成功 */
    cfxSendSuccessed: false,
    /** cfx send失败 */
    cfxSendFailed: false,
    /**最新转账成功的hash */
    lastFCSendSuccessHash: '',
  },
  effects: {
    *updateBalance(_, { call, put, select }) {
      try {
        const { currentAccountAddress: address } = yield select(state => state[namespaceOfCfx])
        const { FC } = yield select(state => state[namespace])
        const ratio = yield call(getCirculationRatioPromise, { address, FC })
        const [c2PBalance, p2PBalance, lockBalance] = yield call(getFCStateOfPromise, {
          address,
          FC,
        })
        const fcPersonalFreeBalance = c2PBalance
        const fcPersonalUnLockBalance = (p2PBalance * ratio) / (100 + ratio)
        const fcPersonalLockBalance = lockBalance + (p2PBalance * 100) / (100 + ratio)
        const fcAvailableBalance = fcPersonalFreeBalance + fcPersonalUnLockBalance
        const fcTotalBalance = fcAvailableBalance + fcPersonalLockBalance
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
    *send({ payload }, { call, put, select }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            cfxSending: true,
          },
        })
        const { toAddress, value, gasPrice } = payload
        const { currentAccountAddress: fromAddress } = yield select(state => state[namespaceOfCfx])
        const { FC } = yield select(state => state[namespace])
        // TODO:nonce提取
        const txParams = {
          from: fromAddress,
          nonce: 0, // make nonce appropriate
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
      } catch (e) {}
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}

function getCirculationRatioPromise({ address, FC }) {
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
