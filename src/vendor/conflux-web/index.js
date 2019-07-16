// confluxWeb.cfx

const ConfluxWeb = require('conflux-web')

const compiledContract = require('./FC.json')
const abi = compiledContract.abi

const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537')
export { abi }
export default confluxWeb
