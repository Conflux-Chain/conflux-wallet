import confluxWeb, { abi } from '@/vendor/conflux-web'
import { namespace as namespaceOfCfx } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
const namespace = 'login-create'
export { namespace }
export default {
  namespace,
  state: {
    // =====login=====
    /**登陆成功标志 */
    loginSuccess: false,
    /**登陆验证失败 */
    loginValidateError: false,

    // =====create=====
    /** keyStoreJson 文件内容*/
    keyStoreJson: '',
    /**
     *- 创建账户是否成功，这里取决于UI是什么时候调用`create` effects，
     *- 可以是输入密码后直接点击下一步的时候创建，可以是下载keystore文件的时候创建
     *- 创建成功后，keyStoreJson已经出来，这是一个同步过程
     *  */
    createAccountIsSuccess: false,
  },
  effects: {
    *create({ payload }, { put }) {
      try {
        const { password } = payload
        const account = confluxWeb.cfx.accounts.create(password)
        confluxWeb.cfx.accounts.wallet.add(account)
        const { privateKey, address } = account
        const FC = new confluxWeb.cfx.Contract(abi as any, address)
        const keyStoreJson = confluxWeb.cfx.accounts.encrypt(privateKey, password)
        yield put({
          type: 'setState',
          payload: {
            keyStoreJson,
            createAccountIsSuccess: true,
          },
        })
        yield put({
          type: 'getAccountAfterHandleAction',
          payload: {
            address,
            privateKey,
            FC,
          },
        })
      } catch (e) {}
    },
    *login({ payload }, { put }) {
      try {
        const { keystoreJson, password } = payload
        const account = confluxWeb.cfx.accounts.decrypt(keystoreJson, password)
        const { privateKey, address } = account
        const FC = new confluxWeb.cfx.Contract(abi as any, address)
        yield put({
          type: 'setState',
          payload: {
            loginSuccess: true,
          },
        })
        yield put({
          type: 'getAccountAfterHandleAction',
          payload: {
            address,
            privateKey,
            FC,
          },
        })
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
    /**获取到用户信息后的action */
    *getAccountAfterHandleAction({ payload }, { put }) {
      const { address, privateKey, FC } = payload
      // 存储cfx address/privateKey
      yield put({
        type: `${namespaceOfCfx}/setState`,
        payload: {
          currentAccountAddress: address,
          currentAccountPrivateKey: privateKey,
        },
      })
      // 存储FC
      yield put({
        type: `${namespaceOfFc}/setState`,
        payload: {
          FC,
        },
      })
      // TODO:操作成功后跳转
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
