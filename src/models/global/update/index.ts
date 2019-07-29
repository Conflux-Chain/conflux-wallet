const namespace = 'global-update'
export { namespace }
export default {
  namespace,
  state: {
    updateInfo: [],
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
