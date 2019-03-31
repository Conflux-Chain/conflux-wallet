/*
 * DeployContractProgress Messages
 *
 * This contains all the text for the DeployContractProgress component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeployContractProgress';

export default defineMessages({
  sendingTip: {
    id: `${scope}.sendingTip`,
    defaultMessage: 'Sending...',
  },
  alertErr1: {
    id: `${scope}.alertErr1`,
    defaultMessage: 'Send Error',
  },
  alertSuccess: {
    id: `${scope}.alertSuccess`,
    defaultMessage: 'Send sucessfull',
  },
  labelTxHash: {
    id: `${scope}.labelTxHash`,
    defaultMessage: 'TxHash',
  },
});
