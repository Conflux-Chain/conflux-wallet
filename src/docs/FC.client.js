const ConfluxWeb = require('conflux-web')
const fs = require('fs')
const web3 = require('web3')
const ethers = require('ethers')
const BN = web3.utils.BN
const compiledContract = require('../build/contracts/FC.json')

const confluxWeb = new ConfluxWeb('https://wallet.confluxscan.io/api/')
//const confluxWeb = new ConfluxWeb('http://127.0.0.1:8091');

const decimals = new BN('10').pow(new BN('18'))

const privateKey = '0x23b7f5c4d0cf061b26460e59e594352b4b8b604f3251f0cc19abdc54d12e7f78'
confluxWeb.cfx.accounts.wallet.add(privateKey)

const abi = compiledContract.abi

//const contractAddress = '0x401a59465fe047e262c1f8708a6184fb65f85e6a';
const contractAddress = '0xd29c3302edff23bf425ba6e0ba6e17da16fb287c'

// Construct contract object
const FC = new confluxWeb.cfx.Contract(abi, contractAddress, {
  defaultGasPrice: '10', // default gas price
})

function info() {
  FC.methods
    .name()
    .call()
    .then(result => {
      console.log('Name: ' + result)
    })
    .catch(console.error)

  FC.methods
    .symbol()
    .call()
    .then(result => {
      console.log('Symbol: ' + result)
    })
    .catch(console.error)

  FC.methods
    .decimals()
    .call()
    .then(result => {
      console.log('Decimals: ' + result)
    })
    .catch(console.error)

  FC.methods
    .cap()
    .call()
    .then(result => {
      console.log('Cap: ' + string(result))
    })
    .catch(console.error)

  FC.methods
    .circulationRatio()
    .call()
    .then(result => {
      console.log('Circulation Ratio: ' + result)
    })
    .catch(console.error)
}

function string(result) {
  result = new BN(result.toString())
  return result.div(decimals) + '.' + result.mod(decimals) + ' - ' + result
}

function totalSupply() {
  FC.methods
    .totalSupply()
    .call()
    .then(result => {
      result = new BN(result.toString())
      console.log('Total supply: ' + string(result))
    })
    .catch(console.error)
}

function balanceOf(account) {
  FC.methods
    .balanceOf(account)
    .call()
    .then(result => {
      console.log(result.toString())
    })
    .catch(console.error)
}

function stateOf(account) {
  FC.methods
    .stateOf(account)
    .call()
    .then(result => {
      console.log('--------------------------')
      console.log(account + ' Summary: ')
      console.log('Conflux Pool: ' + string(result[0]))
      console.log('Personal Unlocked Pool: ' + string(result[1]))
      console.log('Personal Locked Pool: ' + string(result[2]))
      console.log('+------------------------+')
    })
    .catch(console.error)
}

function circulationRatio() {
  FC.methods
    .circulationRatio()
    .call()
    .then(result => {
      console.log(result)
    })
    .catch(console.err)
}

function transfer(recipient, value, nonce) {
  const txParams = {
    from: 0,
    nonce: nonce, // make nonce appropriate
    gasPrice: 10,
    gas: 10000000,
    value: 0,
    to: contractAddress,
    data: FC.methods.transfer(recipient, value).encodeABI(), // get data from ABI
  }
  confluxWeb.cfx
    .signTransaction(txParams)
    .then(encodedTransaction => {
      const { rawTransaction } = encodedTransaction
      //console.log('raw transaction: ', rawTransaction);
      return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then(transactionHash => {
        console.log('transaction hash from RPC: ', transactionHash)
      })
    })
    .catch(console.error)
}

totalSupply()
info()

// stateOf("0x544aa8f554d2ffbc81e0aa0f533f76f5220db09c");
// stateOf("0xa346afe905ecb048bd50a6559840f5ad2a04053e");
// stateOf("0x40282dc31a83d2189146f99c29bf7dcaaf57ac72");
// stateOf("0xc4d45d87593eb39da895f4d78bac9c2e094d90b6");
// transfer('0xc4d45d87593eb39da895f4d78bac9c2e094d90b6', "100000000000000000000000", 4);
stateOf('0xc4d45d87593eb39da895f4d78bac9c2e094d90b6')
