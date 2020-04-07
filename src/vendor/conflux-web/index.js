// confluxWeb.cfx
import { util, Conflux } from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js'
const ConfluxWeb = require('conflux-web')

const compiledContract = require('./FC.json')
const abi = compiledContract.abi

// 旧的conflux-web 创建账户用这个
// const confluxWeb = new ConfluxWeb('https://wallet.confluxscan.io/api/')
const confluxWeb = new ConfluxWeb('http://47.95.29.28:12537')

// 新的js-conflux-sdk，交易相关用这个
const cfx = new Conflux({
  url: 'http://47.95.29.28:12537',
  defaultGasPrice: 100,
  defaultGas: 1000000,
  logger: console, // FIXME: add for debug
})
export { util, cfx }

export { abi }
export default confluxWeb
