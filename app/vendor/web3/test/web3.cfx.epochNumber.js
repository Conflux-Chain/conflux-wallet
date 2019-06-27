#!/usr/bin/env node

var testProperty = require('./helpers/test.property.js');

var method = 'epochNumber';

var tests = [
  {
    resultType: 'number',
  },
];

testProperty.runTests('cfx', method, tests);
