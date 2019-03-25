/*
 *
 * SendToken actions
 *
 */
import {
  CHANGE_FROM,
  CHANGE_GAS,
  CHANGE_GAS_PRICE,
  COMFIRM_DEPLOAY_CONTRACT,
  COMFIRM_DEPLOAY_CONTRACT_SUCCESS,
  COMFIRM_DEPLOAY_CONTRACT_ERROR,
  ABORT_DEPLOAY,
  DEPLOAY_CONTRACT,
  DEPLOAY_CONTRACT_SUCCESS,
  DEPLOAY_CONTRACT_ERROR,
} from './constants';

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

export function confirmDeploayContract() {
  return {
    type: COMFIRM_DEPLOAY_CONTRACT,
  };
}

export function confirmDeploayContractSuccess(msg) {
  if (msg) {
    return {
      type: COMFIRM_DEPLOAY_CONTRACT_SUCCESS,
      msg,
    };
  }

  return {
    type: COMFIRM_DEPLOAY_CONTRACT_SUCCESS,
    msg: 'Deploay confirmed successfully, Send to transmit',
  };
}

export function confirmDeploayContractError(error) {
  return {
    type: COMFIRM_DEPLOAY_CONTRACT_ERROR,
    error,
  };
}

export function abortDeploay() {
  return {
    type: ABORT_DEPLOAY,
  };
}

export function deploayContract() {
  return {
    type: DEPLOAY_CONTRACT,
  };
}

export function deploaySuccess(tx) {
  return {
    type: DEPLOAY_CONTRACT_SUCCESS,
    tx,
  };
}

export function deploayError(error) {
  return {
    type: DEPLOAY_CONTRACT_ERROR,
    error,
  };
}
