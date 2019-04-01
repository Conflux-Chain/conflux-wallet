/*
 *
 * SendToken actions
 *
 */
import msgText from 'translations/msg';
import {
  CHANGE_CODE,
  CHANGE_FROM,
  CHANGE_GAS,
  CHANGE_GAS_PRICE,
  COMFIRM_DEPLOY_CONTRACT,
  COMFIRM_DEPLOY_CONTRACT_SUCCESS,
  COMFIRM_DEPLOY_CONTRACT_ERROR,
  ABORT_DEPLOY,
  DEPLOY_CONTRACT,
  DEPLOY_CONTRACT_SUCCESS,
  DEPLOY_CONTRACT_ERROR,
  DEPLOY_IN_PROGRESS,
} from './constants';
import { store } from '../../app';

export function changeCode(code) {
  return {
    type: CHANGE_CODE,
    code,
  };
}
export function changeFrom(address) {
  return {
    type: CHANGE_FROM,
    address,
  };
}

export function changeGas(gas) {
  if (!gas) {
    return {
      type: CHANGE_GAS,
      gas: 1,
    };
  }
  return {
    type: CHANGE_GAS,
    gas,
  };
}

export function changeGasPrice(gasPrice) {
  if (gasPrice === '') {
    return {
      type: CHANGE_GAS_PRICE,
      gasPrice: 0,
    };
  }
  return {
    type: CHANGE_GAS_PRICE,
    gasPrice,
  };
}

export function confirmDeployContract() {
  return {
    type: COMFIRM_DEPLOY_CONTRACT,
  };
}

export function confirmDeployContractSuccess(msg) {
  const locale =
    store
      .getState()
      .get('language')
      .get('locale') || 'en';
  if (msg) {
    return {
      type: COMFIRM_DEPLOY_CONTRACT_SUCCESS,
      msg,
    };
  }

  return {
    type: COMFIRM_DEPLOY_CONTRACT_SUCCESS,
    msg: msgText[locale]['Deploy confirmed successfully, Send to transmit'],
  };
}

export function confirmDeployContractError(error) {
  return {
    type: COMFIRM_DEPLOY_CONTRACT_ERROR,
    error,
  };
}

export function abortDeploy() {
  return {
    type: ABORT_DEPLOY,
  };
}

export function deployContract() {
  return {
    type: DEPLOY_CONTRACT,
  };
}

export function deploySuccess(tx) {
  return {
    type: DEPLOY_CONTRACT_SUCCESS,
    deploySuccess: tx,
  };
}

export function deployError(error) {
  return {
    type: DEPLOY_CONTRACT_ERROR,
    error,
  };
}

export function deployInProgress(value) {
  return {
    type: DEPLOY_IN_PROGRESS,
    deployInProgress: value,
  };
}
