#!/usr/bin/env node

var testProperty = require('./helpers/test.property.js');

var method = 'bestBlockHash';

var tests = [
  {
    resultType: 'string',
  },
];

testProperty.runTests('cfx', method, tests);
