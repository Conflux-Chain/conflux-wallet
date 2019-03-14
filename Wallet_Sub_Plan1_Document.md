项目仓库：https://phabricator.conflux-chain.org/source/conflux-wallet

原开源仓库：https://github.com/PaulLaux/eth-hot-wallet

为理解该项目，大致路线为：

熟悉 React 全家桶(涉及 React 生态多个框架) → 熟悉区块链知识，尤其是 keystore 以及 eth 交易签名这块

项目概况：

一、

    A、已实现功能：Sub Plan 1 -- sendTransaction。核心功能已跑通。
        a、Account相关
            1)、create wallet
            2)、restore wallet
            3)、lock wallet
            4)、unlock wallet
        B、Address相关
            1)、add address
            2)、check balance
            3)、send Transaction

    B、未实现功能：
        a、细枝末节,更多是UI部分，诸如ETH的token名称应改为CFX之类的。
        b、充值水龙头。钱包这里应该接一个 水龙头的充值接口，为特定地址进行充值。现在钱包里，有这个入口，会在初次创建wallet时，右下角提示用户使用ETH的测试网Ropsten进行充值。这里等 水龙头API准备好后，改下API的充值地址即可。

二、项目框架。

A、该项目采用了[React 全家桶框架](https://github.com/react-boilerplate/react-boilerplate), 需要对其中用到的技术非常熟悉。比较好的 [Guide](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/introduction.md)：

核心技术框架为：

- [React](https://facebook.github.io/react/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Redux](http://redux.js.org/)
- [Redux Saga](https://redux-saga.github.io/redux-saga/)
- [Reselect](https://github.com/reactjs/reselect)
- [ImmutableJS](https://facebook.github.io/immutable-js/)
- [Styled Components](https://github.com/styled-components/styled-components)

B、React 领域比较好的学习文档

- [React-howto](https://github.com/petehunt/react-howto)
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)

三、核心代码

1、先直观感受下 sendTransaction。 最简化的代码(Node.js 环境下) 如下：

    步骤：
        1. 组装rawTransaction 即 rawTx
        2. 使用 ethereumjs-tx 开源库，用privateKey对rawTx进行签名
        3. 签名后的交易信息rawTransaction，调用web3发送交易

```
var Web3 = require("./lib/web3.js");//web3.js要加载我们自己的web3 lib
var Tx = require("./lib/ethereumjs-tx");//ethereumjs-tx需要修改源码，具体修改在下边
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));
var privateKey = Buffer.from(
"e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
"hex"
);
var rawTx = {
nonce: "0x00",
gasPrice: "0x09184e72a000",
gasLimit: "0x2710",
to: "0x0000000000000000000000000000000000000000",
value: "0x00",
data:
"0x7f7465737432000000000000000000000000000000000000000000000000000000600057"
};
var tx = new Tx(rawTx);
tx.sign(privateKey);
let transactionHash=web3.cfx.sendRawTransaction('0x' + serializedTx.toString('hex'));
console.log('0x' + serializedTx.toString('hex'))
console.log('Transaction Hash: '+transactionHash)

```

注解： ethereumjs-tx 具体修改的部分在： ethereumjs-tx/index.js 中

```
  /**
   * sign a transaction with a given private key
   * @param {Buffer} privateKey Must be 32 bytes in length
   */
  sign (privateKey) {
    const msgHash = this.hash(false)
    const sig = ethUtil.ecsign(msgHash, privateKey)
    if (this._chainId > 0) {
      sig.v += this._chainId * 2 + 8
    }
    sig.v-=27 //新增的代码
    Object.assign(this, sig)
  }

```

2、针对 Conflux Wallet 的说明

A、Eth-hot-wallet 在关于 keystore 以及 signTransaction 核心功能上采用了多个开源库，核心库为：

- [eth-lightwallet](https://github.com/ConsenSys/eth-lightwallet) : A minimal ethereum javascript wallet. 该库用于 keystore 的管理以及提供私钥签名的功能

* [ethjs-provider-signer](https://github.com/ethjs/ethjs-provider-signer) : A simple web3 standard provider that signs sendTransaction payload. 该库提供了 sign Transaction 的 provider

* [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx) : A simple module for creating, manipulating and signing ethereum transactions. 该库主要用于对交易进行签名

B、核心代码

1. app/containers/Header/saga.js - loadNetwork 方法里

```
import SignerProvider from "vendor/ethjs-provider-signer/ethjs-provider-signer";
const provider = new SignerProvider("http://localhost:8091", {
        signTransaction: keystore.signTransaction.bind(keystore),
        accounts: cb => cb(null, keystore.getAddresses())
      });
web3.setProvider(provider);//

```

注解： 最传统的方式是 web3.setProvider(new web3.providers.HttpProvider()),直接设置一个新的 HttpProvider 实例。但 Wallet 这边，是直接在 new Provider 时，hook 了一个 signProvider().来直接看 ethjs-provider-signer 的部分核心代码：

```
if (payload.method === "cfx_sendTransaction") {
            // get the nonce, if any
            self.rpc.sendAsync(
              {
                method: "cfx_getTransactionCount",
                params: [payload.params[0].from, "latest"]
              },
              function(nonceError, nonce) {
                // eslint-disable-line
                if (nonceError) {
                  return callback(
                    new Error(
                      "[ethjs-provider-signer] while getting nonce: " +
                        nonceError
                    ),
                    null
                  );
                }

                // get the gas price, if any
                self.rpc.sendAsync({ method: "cfx_gasPrice" }, function(
                  gasPriceError,
                  gasPrice
                ) {
                  // eslint-disable-line
                  if (gasPriceError) {
                    return callback(
                      new Error(
                        "[ethjs-provider-signer] while getting gasPrice: " +
                          gasPriceError
                      ),
                      null
                    );
                  }

                  // build raw tx payload with nonce and gasprice as defaults to be overriden
                  var rawTxPayload = Object.assign(
                    {
                      nonce: nonce,
                      gasPrice: gasPrice
                    },
                    payload.params[0]
                  );

                  // sign transaction with raw tx payload
                  //这里是关键。这里的self.options.signTransaction其实调用的就是最初new SignerProvider时，传入的signTransaction方法。然后带着signTransaction callback回来的参数signedHexPayload，直接RPC发送签名过的交易信息
                  self.options.signTransaction(rawTxPayload, function(
                    keyError,
                    signedHexPayload
                  ) {
                    // eslint-disable-line
                    if (!keyError) {
                      // create new output payload
                      var outputPayload = Object.assign(
                        {},
                        {
                          id: payload.id,
                          jsonrpc: payload.jsonrpc,
                          method: "cfx_sendRawTransaction",
                          params: [signedHexPayload]
                        }
                      );

                      // send payload
                      self.provider.sendAsync(outputPayload, callback);
                    } else {
                      //callback(new Error('[ethjs-provider-signer] while signing your transaction payload: ' + JSON.stringify(keyError)), null);
                      console.error(
                        "[ethjs-provider-signer] while signing your transaction payload:",
                        keyError
                      );
                      callback(keyError, null);
                    }
                  });
                });
              }
            );
          }
```

SignProvider 里的核心代码看过后，注意下最初 new SignProvider 实例时传入的 signTransaction 参数,这里传入的 keystore.signTransaction.bind(keystore)。keystore 其实是 lightwallet.keystore 的实例，即在改变 this 指向的情况下，调用了 keystore 里 signTransaction 方法。那么，来看下 eth-lightwallet 库下的 lib/keystore.js 源码：

```
KeyStore.prototype.signTransaction = function (txParams, callback) {
  var _this = this

  var ethjsTxParams = {};

  // ethjsTxParams.from = add0x(txParams.from);
  ethjsTxParams.to = add0x(txParams.to);
  ethjsTxParams.gasLimit = add0x(txParams.gas);
  ethjsTxParams.gasPrice = add0x(txParams.gasPrice);
  ethjsTxParams.nonce = add0x(txParams.nonce);
  ethjsTxParams.value = add0x(txParams.value);
  ethjsTxParams.data = add0x(txParams.data);

  // var txObj = new Transaction(ethjsTxParams);
  // var rawTx = txObj.serialize().toString('hex');
  var signingAddress = strip0x(txParams.from);
  var salt = this.salt;
  var self = this;
  this.passwordProvider( function (err, password, salt) {
    if (err) return callback(err);

    if (!salt) {
      salt = _this.salt
    }

    _this.keyFromPassword(password, function (err, pwDerivedKey) {
      if (err) return callback(err);
      var signedTx = signing.signTx(self, pwDerivedKey, ethjsTxParams, signingAddress, self.defaultHdPathString);//这里是核心逻辑
      callback(null, '0x' + signedTx);
    })
  })

};

```

注解：前边的逻辑是 获取一些 常用的 Transaction Params，signing.signTx 是核心逻辑，这里会调用必备的参数进行签名。来看下 signing.js 的核心代码：

```
var Transaction = require("ethereumjs-tx")
var util = require("ethereumjs-util")
//下边的signTx是核心
var signTx = function (keystore, pwDerivedKey, rawTx, signingAddress) {
  if(!keystore.isDerivedKeyCorrect(pwDerivedKey)) {
    throw new Error("Incorrect derived key!");
  }
  // rawTx = util.stripHexPrefix(rawTx);
  signingAddress = util.stripHexPrefix(signingAddress);
  var tx = new Transaction(rawTx);
  var privKey = keystore.exportPrivateKey(signingAddress, pwDerivedKey);
  tx.sign(new Buffer(privKey, 'hex'));
  console.log(tx);
  var serializedTx = tx.serialize();
  privKey = '';
  return tx.serialize().toString('hex');
};

```

其实这里就发现了 sendTransaction 的核心，eth-lightwallet 库 调用的其实也是 ethereumjs-tx 库 的签名逻辑。并返回 私钥对交易签名完成后的字符串

3、其他重要的注意事项

- ethereumjs-tx 源码对 sig.v 会 -27。 但这里需要注意一个问题，比如 eth-lightwallet 也会调用 ethereumjs-tx 库，这时应该修改 eth-lightwallet 这个工程 node-modules 下的 ethereumjs-tx。本地开发可以先这样改。 但正确的方式应该是： 以 ethereumjs-tx 为例，应该从 ethereumjs-tx 源仓库 fork 一份出来，然后 package.json 中 dependencies 添加依赖的时候，添加自己仓库下的 ethereumjs-tx 库即可。这样以后多端引用 ethereumjs-tx 时，就会统一，确保 ethereumjs-tx 只有一个入口。

* 针对 Conflux 自己的 web3.js，正确的做法也如上所说，dependencies 添加依赖时，要使用 github 上的自己的开源仓库。本地开发可以先导入到 lib 中使用。
