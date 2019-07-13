import confluxWeb, { abi } from '@/vendor/conflux-web'
import { namespace as namespaceOfCfx } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { namespace as namespaceOfCommon } from '@/models/global/common'
import config from '@/config'
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
    /** keystoreJson 文件内容*/
    keystoreJson: '',
    /**
     *- 创建账户是否成功，这里取决于UI是什么时候调用`create` effects，
     *- 可以是输入密码后直接点击下一步的时候创建，可以是下载keystore文件的时候创建
     *- 创建成功后，keyStoreJson已经出来，这是一个同步过程
     *  */
    createAccountIsSuccess: false,
    /**lock失败 */
    lockError: false,
    /**是否解锁失败 */
    unlockError: false,
    /**restore钱包时密码是否正确 */
    restorePasswordRight: true,
  },
  effects: {
    // 根据密码创建账户
    *create({ payload, callback, errCallback }, { put }) {
      try {
        const { password } = payload
        const account = confluxWeb.cfx.accounts.create(password)
        confluxWeb.cfx.accounts.wallet.add(account)
        const { privateKey, address } = account
        const keystoreJson = confluxWeb.cfx.accounts.encrypt(privateKey, password)
        yield put({
          type: 'setState',
          payload: {
            keystoreJson,
            createAccountIsSuccess: true,
          },
        })
        yield put({
          type: 'getAccountAfterHandleAction',
          payload: {
            address,
            privateKey,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof callback === 'function' && callback()
      } catch (e) {
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback()
      }
    },
    *login({ payload, callback, errCallback }, { put }) {
      try {
        const { keystoreJson, password } = payload
        const account = confluxWeb.cfx.accounts.decrypt(keystoreJson, password)
        const { privateKey, address } = account

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
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof callback === 'function' && callback()
      } catch (e) {
        // 验证失败
        yield put({
          type: 'setState',
          payload: {
            loginValidateError: true,
            restorePasswordRight: false,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback()
      }
    },
    /**获取到用户信息后的action */
    *getAccountAfterHandleAction({ payload }, { put }) {
      const FC = new confluxWeb.cfx.Contract(abi as any, config.FCContractAdress)
      const { address, privateKey } = payload
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
      // 更新login状态
      yield put({
        type: `${namespaceOfCommon}/setState`,
        payload: {
          isLogin: true,
        },
      })
    },
    *init(_, { put }) {
      yield put({
        type: 'setState',
        payload: {
          loginSuccess: false,
          loginValidateError: false,
          keystoreJson: false,
          createAccountIsSuccess: '',
          restorePasswordRight: true,
        },
      })
    },
    /**
     * 加锁
     */
    *lock({ payload, callback, errCallback }, { put, select }) {
      try {
        const { password } = payload
        const { keystoreJson } = select(state => state[namespace])
        confluxWeb.cfx.accounts.decrypt(keystoreJson, password)
        yield put({
          type: 'setState',
          payload: {
            lockError: false,
          },
        })
        yield put({
          type: `${namespaceOfCommon}/setState`,
          payload: {
            lockStatus: true,
          },
        })
      } catch (e) {
        yield put({
          type: 'setState',
          payload: {
            lockError: true,
          },
        })
      }
    },
    /**
     * 解锁
     */
    *unLock({ payload, callback, errCallback }, { put, select }) {
      try {
        const { password } = payload
        const { keystoreJson } = select(state => state[namespace])
        confluxWeb.cfx.accounts.decrypt(keystoreJson, password)
        yield put({
          type: 'setState',
          payload: {
            unlockError: false,
          },
        })
        yield put({
          type: `${namespaceOfCommon}/setState`,
          payload: {
            lockStatus: false,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof callback === 'function' && callback()
      } catch (e) {
        yield put({
          type: 'setState',
          payload: {
            unlockError: true,
          },
        })
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback()
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
