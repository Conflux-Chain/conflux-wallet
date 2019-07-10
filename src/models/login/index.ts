import confluxWeb from '@/vendor/conflux-web'
import { namespace as namespaceOfCfx } from '@/models/cfx'
const namespace = 'login'
export { namespace }
export default {
  namespace,
  state: {
    testState: Math.random(),
    /**登陆验证失败 */
    loginValidateError: false,
  },
  effects: {
    *create({ payload }, { put }) {
      try {
        const { password } = payload
        const account = confluxWeb.cfx.accounts.create(password)
        confluxWeb.cfx.accounts.wallet.add(account)
        const { privateKey, address } = account
        yield put({
          type: `${namespaceOfCfx}/setState`,
          payload: {
            cfxAccountAddress: address,
            cfxAccountPrivateKey: privateKey,
          },
        })
        // TODO:操作成功后跳转
      } catch (e) {}
    },
    *login({ payload }, { put }) {
      try {
        const { keystoreJson, password } = payload
        const account = confluxWeb.cfx.accounts.decrypt(keystoreJson, password)
        const { privateKey, address } = account
        yield put({
          type: `${namespaceOfCfx}/setState`,
          payload: {
            cfxAccountAddress: address,
            cfxAccountPrivateKey: privateKey,
          },
        })
        // TODO:操作成功后跳转
      } catch (e) {
        // 验证失败
        yield put({
          type: 'setState',
          payload: {
            loginValidateError: true,
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
