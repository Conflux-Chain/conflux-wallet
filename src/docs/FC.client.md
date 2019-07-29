Web 端 API 使用手册

参考 FC.client.js 脚本

Call

    // using the promise
    FC.methods.myFunc().call()
        .then((result) => {
    	// Do Something
        }).catch(console.error);

Note: 将 myFunc 替换成相应 function

1. 读取全局常量
   - name(): 读取合约全称
   - symbol(): 读取合约缩写
   - decimals(): 读取精度
   - cap(): 读取发行总量上限
2. 读取全局变量
   - circulationRatio(): 读取当前流通比例
   - totalSupply(): 读取当前发行总量
   - isTransferPaused(): 读取当前转账功能是否已暂停
   - isBurnPaused(): 读取当前销毁功能是否已暂停
3. 读取个人变量
   - balanceOf(account): 读取指定地址的余额
   - stateOf(account): 读取指定地址的 Conflux 池，未锁定及锁定个人池的余额

Send

    const txParams = {
            from: 0,
            nonce: nonce, // make nonce appropriate
            gasPrice: 10,
            gas: 10000000,
            value: 0,
            to: contractAddress,
            data: FC.methods.myFunc().encodeABI(), // get data from ABI
        };

    confluxWeb.cfx.signTransaction(txParams)
        .then((encodedTransaction) => {
            const { rawTransaction } = encodedTransaction;
            return confluxWeb.cfx.sendSignedTransaction(rawTransaction)
            .then((transactionHash) => {
                console.log('transaction hash from RPC: ',transactionHash);
            });
        }).catch(console.error);

1. 个人
   - transfer(recipient, value, nonce): 当转账功能开启时，向指定地址转账
   - burn(value, nonce): 当销毁功能开启时，销毁发起地址部分 FC
