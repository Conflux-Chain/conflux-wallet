/*
 * DeployContractTo Messages
 *
 * This contains all the text for the DeployContractTo component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeployContractTo';

export default defineMessages({
  sourceTitle: {
    id: `${scope}.sourceTitle`,
    defaultMessage: 'Contract Address',
  },
  placeholderDeployContractTo: {
    id: `${scope}.placeholderDeployContractTo`,
    defaultMessage: 'Send to contract address',
  },
});
