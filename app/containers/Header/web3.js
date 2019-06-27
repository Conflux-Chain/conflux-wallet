import Web3 from 'vendor/web3';
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://testnet-jsonrpc.conflux-chain.org:12537'));
export default web3;
