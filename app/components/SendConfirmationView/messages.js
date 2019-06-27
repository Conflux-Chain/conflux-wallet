/*
 * SendConfirmationView Messages
 *
 * This contains all the text for the SendConfirmationView component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SendConfirmationView';

export default defineMessages({
  checkingTip: {
    id: `${scope}.checkingTip`,
    defaultMessage: 'Contract Bytecode',
  },
  alertErr1: {
    id: `${scope}.alertErr1`,
    defaultMessage: 'Transaction not created',
  },
  alertErr2: {
    id: `${scope}.alertErr2`,
    defaultMessage: 'Transaction is valid',
  },
  btnTryAgain: {
    id: `${scope}.btnTryAgain`,
    defaultMessage: 'Try again',
  },
  btnSendCfx: {
    id: `${scope}.btnSendCfx`,
    defaultMessage: 'Send CFX',
  },
  btnReset: {
    id: `${scope}.btnReset`,
    defaultMessage: 'Reset Transaction',
  },
});
