#!/usr/bin/env node

var testProperty = require('./helpers/test.property.js');

var method = 'gasPrice';

var tests = [
  {
    resultType: 'object',
  },
];

testProperty.runTests('cfx', method, tests);
