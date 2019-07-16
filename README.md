## 项目说明

需要熟悉 React 全家桶(涉及 React 生态多个框架) → 熟悉区块链知识，核心API主要参考[web3](https://github.com/ethereum/web3.js)和[conflux-web]([https://www.npmjs.com/package/conflux-web](https://www.npmjs.com/package/conflux-web))这2个库

## 项目概况

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
## 项目框架。

该项目采用了[CRA](https://github.com/facebook/create-react-app)来搭建基础框架，主要包含以下技术和实现

- 环境变量+config
- sass
- tslint+prettier
- husky+lint-stage
- request+axios
- import alias 别名配置
- dev-server+proxy
- react-app-rewired+customize-cra
- import alias 别名
- HMR 支持
- react-router+dva-core
- css-modules

具体配置和说明可参照[这里](https://github.com/yzStrive/react-template/issues/1)

## 核心代码说明

1. 关于 accounts 相关的 api,可查看`src/models/login`中的代码

2. 关于CFX 相关的 api，可查看`src/models/cfx`中的代码

3. 关于FC相关的api，可查看`src/models/fx`中的代码，结合`src/docs/FC.client.js和src/docs/FC.client.js FC.client.md`相关文档查看

4. 关于FC balance相关的api，需要查看`src/docs/`,，其中`Web Wallet 数值计算公式.pdf`主要是用来计算FC balance的规则

5. 关于send这块，目前conflux-web的npm`0.1.9`还存在一些问题，CFX和FC的send使用同一个api，CFX不能调用`sendTransaction`api,因为conflux-web没有实现，目前解决方式是调用同一个api

   ```typescript
   export function sendSignedTransactionPromise(txParams) {
     return new Promise((resolve, reject) => {
       confluxWeb.cfx
         .signTransaction(txParams)
         .then((encodedTransaction: any) => {
           const { rawTransaction } = encodedTransaction
           confluxWeb.cfx
             .sendSignedTransaction(rawTransaction)
             .then(transactionHash => {
               return resolve(transactionHash)
             })
             .catch(err => {
               return reject(new Error(err))
             })
         })
         .catch(err => {
           return reject(err)
         })
     })
   }
   ```

   关于参数txParams的说明

   > 使用confluxWeb.cfx.signTransaction之前，保证txParams里的from为0，而且使用confluxWeb.cfx.accounts.wallet.add(privKey)添加用于签名的私钥，如果from不为0或者wallet里下标0的位置没有对应私钥的话，confluxWeb.cfx.signTransaction这个接口还会去走rpc请求，就会出现method not found

## 获取交易信息

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getTransactionByHash","params":["0xa68f0d871cd7eea324029114d4fc8f784e0a3ebbef392d12b12bdd2e2a69fb03"],"id":1}' -H "Content-Type: application/json" http://testnet-jsonrpc.conflux-chain.org:12537
```
