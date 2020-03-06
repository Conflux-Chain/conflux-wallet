// confluxWeb.cfx

const ConfluxWeb = require('conflux-web')

const compiledContract = require('./FC.json')
const abi = compiledContract.abi

// const confluxWeb = new ConfluxWeb('https://wallet.confluxscan.io/api/')
const confluxWeb = new ConfluxWeb('http://139.224.196.246:12537')
export { abi }
export default confluxWeb
