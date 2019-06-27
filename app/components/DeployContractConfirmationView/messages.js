/*
 * DeployContractConfirmationView Messages
 *
 * This contains all the text for the DeployContractConfirmationView component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeployContractConfirmationView';

export default defineMessages({
  checkingTip: {
    id: `${scope}.checkingTip`,
    defaultMessage: 'checking transaction....',
  },
  alertErr1: {
    id: `${scope}.alertErr1`,
    defaultMessage: 'Incomplete data',
  },
  alertErr2: {
    id: `${scope}.alertErr2`,
    defaultMessage: 'Transaction info is valid',
  },
  btnReset: {
    id: `${scope}.btnReset`,
    defaultMessage: 'Reset',
  },
  btnTryAgain: {
    id: `${scope}.btnTryAgain`,
    defaultMessage: 'Try again',
  },
  btnGoDeploy: {
    id: `${scope}.btnGoDeploy`,
    defaultMessage: 'Go Deploy',
  },
  btnGoCall: {
    id: `${scope}.btnGoCall`,
    defaultMessage: 'Go Call',
  },
});
