const namespace = 'home'
export { namespace }
export default {
  namespace,
  state: {
    testState: Math.random(),
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
