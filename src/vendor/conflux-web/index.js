// confluxWeb.cfx
import { util, Conflux } from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js'
const ConfluxWeb = require('conflux-web')

const compiledContract = require('./FC.json')
const abi = compiledContract.abi

// 旧的conflux-web 创建账户用这个
const confluxWeb = new ConfluxWeb('https://wallet.confluxscan.io/api/')
// const confluxWeb = new ConfluxWeb('http://47.95.29.28:12537') //test fullnode

// 新的js-conflux-sdk，交易相关用这个
const cfx = new Conflux({
  //url: 'http://47.95.29.28:12537',
  url: 'https://wallet.confluxscan.io/api/',
  defaultGasPrice: 100,
  logger: console, // FIXME: add for debug
})

export { abi, util, cfx }
export default confluxWeb
