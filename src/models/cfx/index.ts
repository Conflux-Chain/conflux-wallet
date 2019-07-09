import confluxWeb from '@/vendor/conflux-web'
const namespace = 'cfx'
export { namespace }
export default {
  namespace,
  state: {
    /**当前登陆的账户地址 */
    cfxAccountAddress: '',
    /**当前登陆的private key*/
    cfxAccountPrivateKey: '',
    /** cfx余额 */
    cfxBalance: '',
    /** cfx开始send */
    sending: false,
    /** cfx send成功 */
    sendSuccessed: false,
    /** cfx send失败 */
    sendFailed: false,
  },
  effects: {
    /**更新cfx余额 */
    *updateCfxBalance(_, { call, put, select }) {
      try {
        const { cfxAccountAddress } = select(state => state[namespace])
        const cfxBalance = yield call(confluxWeb.cfx.getBalance, cfxAccountAddress)
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
            sending: true,
          },
        })
        // TODO:完整参数
        const config = payload || {
          from: '',
          to: '',
          value: '',
          gas: '',
          gasPrice: '',
          data: '',
          nonce: 0,
        }
        yield call(sendTransactionPromise, config)
        yield put({
          type: 'setState',
          payload: {
            sendSuccessed: true,
          },
        })
      } catch (e) {
        yield put({
          type: 'setState',
          payload: {
            sendFailed: true,
          },
        })
      } finally {
        yield put({
          type: 'setState',
          payload: {
            sending: false,
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
  return new Promise((relsove, reject) => {
    confluxWeb.cfx.sendTransaction(config, (err, hash) => {
      if (err !== null) {
        return reject(err)
      } else {
        return relsove(hash)
      }
    })
  })
}
