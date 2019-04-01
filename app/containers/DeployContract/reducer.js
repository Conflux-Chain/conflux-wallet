/*
 *
 * SendToken reducer
 *
 */
import { fromJS } from 'immutable';
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
} from './constants';

const initialState = fromJS({
  // for test
  code: '7f7465737432000000000000000000000000000000000000000000000000000000600057',
  from: '',
  gas: 10000000,
  gasPrice: 10, // gwei
  locked: false,

  comfirmationLoading: false,
  confirmationError: false,
  confirmationMsg: false,

  deployInProgress: false,
  deployError: false,
  deploySuccess: false,
});

function deployContarctReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CODE:
      return state.set('code', action.code);
    case CHANGE_FROM:
      return state.update('from', (fromValue) => action.address || fromValue);

    case CHANGE_GAS:
      return state.set('gas', action.gas);

    case CHANGE_GAS_PRICE:
      return state.set('gasPrice', action.gasPrice);

    case COMFIRM_DEPLOY_CONTRACT:
      return state.set('comfirmationLoading', true).set('locked', true);

    case COMFIRM_DEPLOY_CONTRACT_SUCCESS:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', action.msg)
        .set('confirmationError', false);

    case COMFIRM_DEPLOY_CONTRACT_ERROR:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationError', action.error)
        .set('locked', false);

    case ABORT_DEPLOY:
      return state
        .set('comfirmationLoading', false)
        .set('confirmationMsg', false)
        .set('confirmationError', false)
        .set('locked', false)
        .set('deployError', false);

    case DEPLOY_CONTRACT:
      return state
        .set('deployInProgress', true)
        .set('deployError', false)
        .set('deploySuccess', false);
    case DEPLOY_CONTRACT_SUCCESS:
      return state
        .set('deployInProgress', false)
        .set('deployError', false)
        .set('deploySuccess', action.deploySuccess);
    case DEPLOY_CONTRACT_ERROR:
      return state
        .set('deployInProgress', false)
        .set('deployError', action.error)
        .set('deploySuccess', false);

    default:
      return state;
  }
}

export default deployContarctReducer;
