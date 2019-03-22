#!/usr/bin/env node

var Web3 = require('../index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:12345'));

var bestBlockHash = web3.cfx.bestBlockHash;
console.log(bestBlockHash);

var bestBlock = web3.cfx.getBlock(bestBlockHash);
console.log(bestBlock);

// var balance = web3.eth.getBalance(coinbase);
// console.log(balance.toString(10));
