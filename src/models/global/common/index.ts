import { namespace as namespaceOfLogin } from '@/models/login'
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
