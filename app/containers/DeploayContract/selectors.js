import { createSelector } from 'reselect';

/**
 * Direct selector to the sendToken state domain
 */
const selectDeploayContractDomain = (state) => state.get('deploaycontract');
const makeSelectCode = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('code')
  );

const makeSelectFrom = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('from')
  );

const makeSelectGas = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('gas')
  );

const makeSelectGasPrice = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('gasPrice')
  );

const makeSelectComfirmationLoading = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('comfirmationLoading')
  );

const makeSelectConfirmationError = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('confirmationError')
  );

const makeSelectConfirmationMsg = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('confirmationMsg')
  );

const makeSelectDeploayInProgress = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('deploayInProgress')
  );

const makeSelectDeploayError = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('deploayError')
  );

const makeSelectLocked = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('locked')
  );

const makeSelectIsDeploayComfirmationLocked = () =>
  createSelector(
    selectDeploayContractDomain,
    (substate) => substate.get('deploayInProgress') !== false || substate.get('sendTx') !== false
  );

export {
  selectDeploayContractDomain,
  makeSelectCode,
  makeSelectFrom,
  makeSelectGas,
  makeSelectGasPrice,
  makeSelectLocked,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectIsDeploayComfirmationLocked,
  makeSelectDeploayInProgress,
  makeSelectDeploayError,
};
