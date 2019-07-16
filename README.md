为理解该项目，大致路线为：

熟悉 React 全家桶(涉及 React 生态多个框架) → 熟悉区块链知识，api 主要参考[web3](https://github.com/ethereum/web3.js)这个库

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

三、核心代码

# 获取交易信息

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"cfx_getTransactionByHash","params":["0xa68f0d871cd7eea324029114d4fc8f784e0a3ebbef392d12b12bdd2e2a69fb03"],"id":1}' -H "Content-Type: application/json" http://testnet-jsonrpc.conflux-chain.org:12537
```
