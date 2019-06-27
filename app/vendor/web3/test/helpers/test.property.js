var chai = require('chai');
var should = chai.should();

var Web3 = require('../../index');
var web3 = new Web3();

var childProcess = require('child_process');
var clone = function(object) {
  return JSON.parse(JSON.stringify(object));
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

var runTests = function(obj, property, tests) {
  var testName = obj ? 'web3.' + obj : 'web';
  var web3 = new Web3();
  var child;

  describe(testName, function() {
    before(async function() {
      var tmp = require('tmp');
      var dirName = tmp.tmpNameSync();

      child = childProcess.spawn(
        './../conflux-rust/target/debug/conflux',
        [
          '--jsonrpc-http-port=12345',
          '--load-test-chain=../conflux-rust/test/blockchain_tests/general_1.json',
          '--test-mode=true',
          '--db-dir=' + dirName,
          '--netconf-dir=' + dirName,
        ],
        { stdio: 'ignore' }
      );
      await sleep(20000);
      web3.setProvider(new web3.providers.HttpProvider('http://localhost:12345'));
    });

    after(function() {
      child.kill();
    });

    describe(property, function() {
      tests.forEach(function(test, index) {
        it('property test: ' + index, function() {
          if (obj) {
            var result = web3[obj][property];
          } else {
            var result = web3[property];
          }
          console.log(result);
          result.should.be.an(test.resultType);
          // assert.deepEqual(test.formattedResult, result);
        });
      });
    });
  });
};

module.exports = {
  runTests: runTests,
};
