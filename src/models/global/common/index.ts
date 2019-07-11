const namespace = 'global-common'
export { namespace }
export default {
  namespace,
  state: {
    lockStatus: false,
  },
  effects: {
    *test({ payload }, { call, put }) {},
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
