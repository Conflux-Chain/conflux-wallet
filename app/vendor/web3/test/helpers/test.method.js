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

var runTests = function(obj, method, tests) {
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

    describe(method, function() {
      tests.forEach(function(test, index) {
        it('sync test: ' + index, function() {
          if (obj) {
            var result = web3[obj][method].apply(web3[obj], test.args);
          } else {
            var result = web3[method].apply(web3, test.args);
          }
          console.log(result);
          result.should.be.an(test.resultType);
          // assert.deepEqual(test.formattedResult, result);
        });

        it('async test: ' + index, function(done) {
          var args = clone(test.args);

          // add callback
          args.push(function(err, result) {
            result.should.be.an(test.resultType);
            // assert.deepEqual(test.formattedResult, result);
            console.log(result);
            done();
          });

          // when
          if (obj) {
            web3[obj][method].apply(web3[obj], args);
          } else {
            web3[method].apply(web3, args);
          }
        });
      });
    });
  });
};

module.exports = {
  runTests: runTests,
};
