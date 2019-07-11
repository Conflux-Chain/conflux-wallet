import ConfluxWeb from 'conflux-web'
const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537')
const compiledContract = require('./FC.json')
const abi = compiledContract.abi
export { abi }
export default confluxWeb
// confluxWeb.cfx
