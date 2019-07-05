const namespace = 'global-menu'
export { namespace }
export default {
  namespace,
  state: {
    selectedKeys: [],
    openKeys: [],
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
