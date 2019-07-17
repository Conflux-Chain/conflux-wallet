import { namespace as namespaceOfLogin } from '@/models/login'
import { namespace as namespaceOfCfx } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { replace } from 'connected-react-router'
const namespace = 'global-common'
export { namespace }
export default {
  namespace,
  state: {
    lockStatus: false,
    isLogin: false,
  },
  effects: {
    *refresh({ callback, errCallback }, { call, put }) {
      try {
        yield put({
          type: `${namespaceOfFc}/updateFCBalance`,
        })
        yield put({
          type: `${namespaceOfCfx}/updateCfxBalance`,
        })
        // tslint:disable-next-line: no-unused-expression
        typeof callback === 'function' && callback()
      } catch (e) {
        // tslint:disable-next-line: no-unused-expression
        typeof errCallback === 'function' && errCallback()
      }
    },
    *close(_, { put }) {
      try {
        yield put({
          type: `setState`,
          payload: {
            isLogin: false,
          },
        })
        // 跳转
        yield put(replace('/login'))
        // 初始化login models的state
        yield put({
          type: `${namespaceOfLogin}/init`,
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
