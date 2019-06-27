#!/usr/bin/env node

var testMethod = require('./helpers/test.method.js');

var method = 'getBlocksByEpoch';

var tests = [
  {
    args: [26],
    resultType: 'array',
  },
];

testMethod.runTests('cfx', method, tests);
