import Web3 from 'vendor/web3';
import Tx from 'ethereumjs-tx';
import BigNumber from 'bignumber.js';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectKeystore, makeSelectPassword } from 'containers/HomePage/selectors';
import { Gwei, maxGasForDeployContract } from 'utils/constants';
import { makeSelectCode, makeSelectFrom, makeSelectGasPrice } from './selectors';
import {
  confirmDeployContractSuccess,
  confirmDeployContractError,
  deploySuccess,
  deployError,
} from './actions';
import { COMFIRM_DEPLOY_CONTRACT, DEPLOY_CONTRACT } from './constants';
const web3 = new Web3();
export function* confirmSendTransaction() {
  try {
    const fromAddress = yield select(makeSelectFrom());
    const code = yield select(makeSelectCode());
    // const gasPrice = yield select(makeSelectGasPrice());

    if (!web3.isAddress(fromAddress)) {
      throw new Error('Source address invalid');
    }

    if (!code) {
      throw new Error('code invalid');
    }
    // TODO:提示语
    const msg = `you can continue deploy contract`;
    yield put(confirmDeployContractSuccess(msg));
  } catch (err) {
    // const errorString = `confirmSendTransaction error - ${err.message}`;
    yield put(confirmDeployContractError(err.message));
  }
}

export function* DeployContract() {
  const keystore = yield select(makeSelectKeystore());
  const origProvider = keystore.passwordProvider;
  try {
    const fromAddress = yield select(makeSelectFrom());
    const code = yield select(makeSelectCode());
    // const gas = yield select(makeSelectGas());
    const gasPrice = new BigNumber(yield select(makeSelectGasPrice())).times(Gwei);
    const password = yield select(makeSelectPassword());

    if (!password) {
      throw new Error('No password found - please unlock wallet before send');
    }
    if (!keystore) {
      throw new Error('No keystore found - please create wallet');
    }
    keystore.passwordProvider = (callback) => {
      // we cannot use selector inside this callback so we use a const value
      const ksPassword = password;
      callback(null, ksPassword);
    };

    const sendParams = {
      from: fromAddress,
      gasPrice,
      gas: maxGasForDeployContract,
    };
    // TODO:complie code
    // const calcCompiled = web3.eth.compile.solidity(code);
    // const abi = calcCompiled.info.abiDefinition;
    // const data = calcCompiled.code;
    // const myContract = new web3.eth.Contract(abi);
    web3.setProvider(
      new web3.providers.HttpProvider('http://testnet-jsonrpc.conflux-chain.org:12537')
    );
    // eslint-disable-next-line no-inner-declarations
    function keyFromPasswordPromise(param) {
      return new Promise((resolve, reject) => {
        keystore.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    const privKey = keystore.exportPrivateKey(fromAddress, pwDerivedKey);
    const privateKey = new Buffer(privKey, 'hex');
    const rawTx = {
      ...sendParams,
      data: `0x${code}`,
    };
    const serializedTx = new Tx(rawTx);
    serializedTx.sign(privateKey);
    const transactionHash = web3.cfx.sendRawTransaction(`0x${serializedTx.toString('hex')}`);
    // TODO:需要编译获得code和abi来部署
    // eslint-disable-next-line no-inner-declarations
    // function deployContractPromise(params) {
    //   return new Promise((reslove, reject) => {
    //     myContract
    //       .deploy({
    //         data,
    //       })
    //       .send(params, (newContractInstance) => {
    //         reslove(newContractInstance);
    //       })
    //       .on('error', (error) => {
    //         reject(error);
    //       });
    //   });
    // }
    // const newContractInstance = yield call(deployContractPromise, sendParams);
    yield put(deploySuccess(transactionHash));
  } catch (err) {
    const loc = err.message.indexOf('at runCall');
    const errMsg = loc > -1 ? err.message.slice(0, loc) : err.message;
    yield put(deployError(errMsg));
  } finally {
    keystore.passwordProvider = origProvider;
  }
}

export default function* defaultSaga() {
  yield takeLatest(COMFIRM_DEPLOY_CONTRACT, confirmSendTransaction);
  yield takeLatest(DEPLOY_CONTRACT, DeployContract);
}
