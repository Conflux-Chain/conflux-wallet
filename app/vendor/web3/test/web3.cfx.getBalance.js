#!/usr/bin/env node

var testMethod = require('./helpers/test.method.js');

var method = 'getBalance';

var tests = [
  {
    args: ['0x027261d6bb0d471442d00bcdf715c29182956102', 23],
    resultType: 'object',
  },
  {
    args: ['0x027261d6bb0d471442d00bcdf715c29182956102', 10],
    resultType: 'object',
  },
  {
    args: ['0x027261d6bb0d471442d00bcdf715c29182956102'],
    resultType: 'object',
  },
];

testMethod.runTests('cfx', method, tests);
