#!/usr/bin/env node

var testMethod = require('./helpers/test.method.js');

var method = 'getBlock';

var tests = [
  {
    args: ['0x14be0bb1e6107a6af7a95ebd208dc142331e8fddcf1fbabff2bba26163aa515d'],
    resultType: 'object',
  },
  {
    args: ['0x14be0bb1e6107a6af7a95ebd208dc142331e8fddcf1fbabff2bba26163aa515d', true],
    resultType: 'object',
  },
];

testMethod.runTests('cfx', method, tests);
