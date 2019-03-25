/*
 *
 * SendToken reducer
 *
 */
import { fromJS } from 'immutable';
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

const initialState = fromJS({
  from: '',
  gas: 0,
  gasPrice: 10, // gwei
  locked: false,

  comfirmationLoading: false,
  confirmationError: false,
  confirmationMsg: false,

  deploayInProgress: false,
  deploayError: false,
  deploaySuccess: false,
});

function deploayContarctReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FROM:
      return state.update('from', (fromValue) => action.address || fromValue);

    case CHANGE_GAS:
      return state.set('gas', action.amount);

    case CHANGE_GAS_PRICE:
      return state.set('gasPrice', action.gasPrice);

    case COMFIRM_DEPLOAY_CONTRACT:
      return state.set('comfirmationLoading', true).set('locked', true);

    case COMFIRM_DEPLOAY_CONTRACT_SUCCESS:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', action.msg)
        .set('confirmationError', false);

    case COMFIRM_DEPLOAY_CONTRACT_ERROR:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationError', action.error)
        .set('locked', false);

    case ABORT_DEPLOAY:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', false)
        .set('confirmationError', false)
        .set('locked', false)
        .set('deploayError', false);

    case DEPLOAY_CONTRACT:
      return state
        .set('deploayInProgress', true)
        .set('deploayError', false)
        .set('deploaySuccess', false);
    case DEPLOAY_CONTRACT_SUCCESS:
      return state
        .set('deploayInProgress', false)
        .set('deploayError', false)
        .set('deploaySuccess', action.tx);
    case DEPLOAY_CONTRACT_ERROR:
      return state
        .set('deploayInProgress', false)
        .set('deploayError', action.error)
        .set('deploaySuccess', false);

    default:
      return state;
  }
}

export default deploayContarctReducer;
