```javascript
const ConfluxWeb = require('conflux-web')
const fs = require('fs')
const compiledContract = require('../build/contracts/FC.json')

const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537')
//const confluxWeb = new ConfluxWeb('http://127.0.0.1:8091');

const privateKey = '0x23b7f5c4d0cf061b26460e59e594352b4b8b604f3251f0cc19abdc54d12e7f78'
confluxWeb.cfx.accounts.wallet.add(privateKey)

const abi = compiledContract.abi

const contractAddress = '0x401a59465fe047e262c1f8708a6184fb65f85e6a'
//const contractAddress = '0x637fafb666a6ca943e968dcf49f661ec5367c286';

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
      console.log('Cap: ' + result)
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

function totalSupply() {
  FC.methods
    .totalSupply()
    .call()
    .then(result => {
      console.log('Total supply: ' + result)
    })
    .catch(console.error)
}

function balanceOf(account) {
  FC.methods
    .balanceOf(account)
    .call()
    .then(result => {
      console.log(result)
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
      console.log('Conflux Pool: ' + result[0])
      console.log('Personal Unlocked Pool: ' + result[1])
      console.log('Personal Locked Pool: ' + result[2])
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

//transfer('0x8cd17f8297073eb55b1d0c678159db720324ed31', 1, 7);

//totalSupply();
stateOf('0x3f471bb67866841760f80c7c85d6c6f10b3a6787')
//stateOf("0x08cb10c9c0bee791d32faeb3a7798067b6131e55");
//stateOf("0xd9e0fcbf5ef7d6f74d28edecdafdf7c5bcea03d7");
stateOf('0x8cd17f8297073eb55b1d0c678159db720324ed31')
```
