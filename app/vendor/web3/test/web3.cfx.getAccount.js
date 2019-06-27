#!/usr/bin/env node

var testMethod = require('./helpers/test.method.js');

var method = 'getAccount';

var tests = [
  {
    args: ['0x027261d6bb0d471442d00bcdf715c29182956102', true, 25],
    resultType: 'object',
  },
  {
    args: ['0x027261d6bb0d471442d00bcdf715c29182956102', true],
    resultType: 'object',
  },
  {
    args: ['0x027261d6bb0d471442d00bcdf715c29182956102'],
    resultType: 'object',
  },
];

testMethod.runTests('cfx', method, tests);
