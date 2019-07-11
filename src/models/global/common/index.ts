const namespace = 'global-common'
export { namespace }
export default {
  namespace,
  state: {
    lockStatus: true,
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
