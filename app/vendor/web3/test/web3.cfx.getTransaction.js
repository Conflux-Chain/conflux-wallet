#!/usr/bin/env node

var testMethod = require('./helpers/test.method.js');

var method = 'getTransaction';

var tests = [
  {
    args: ['0xe5238360a483cb1eaa4e9cf7f33aa4b7244fcfab9266ed92f0fbaf88fb823c1e'],
    resultType: 'object',
  },
];

testMethod.runTests('cfx', method, tests);
