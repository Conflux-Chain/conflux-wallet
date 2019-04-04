import { createSelector } from 'reselect';

/**
 * Direct selector to the sendToken state domain
 */
const selectDeployContractDomain = (state) => state.get('deploycontract');

const makeSelectOperationType = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('operationType')
  );

const makeSelectCode = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('code')
  );

const makeSelectFrom = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('from')
  );

const makeSelectTo = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('to')
  );

const makeSelectAmount = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('amount')
  );

const makeSelectGas = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('gas')
  );

const makeSelectGasPrice = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('gasPrice')
  );

const makeSelectComfirmationLoading = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('comfirmationLoading')
  );

const makeSelectConfirmationError = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('confirmationError')
  );

const makeSelectConfirmationMsg = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('confirmationMsg')
  );

const makeSelectDeployInProgress = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('deployInProgress')
  );

const makeSelectDeployError = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('deployError')
  );

const makeSelectDeploySuccess = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('deploySuccess')
  );

const makeSelectLocked = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) => substate.get('locked')
  );

const makeSelectIsDeployComfirmationLocked = () =>
  createSelector(
    selectDeployContractDomain,
    (substate) =>
      substate.get('deployInProgress') !== false || substate.get('deploySuccess') !== false
  );

export {
  selectDeployContractDomain,
  makeSelectOperationType,
  makeSelectCode,
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectGas,
  makeSelectGasPrice,
  makeSelectLocked,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectIsDeployComfirmationLocked,
  makeSelectDeployInProgress,
  makeSelectDeployError,
  makeSelectDeploySuccess,
};
