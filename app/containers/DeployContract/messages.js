/*
 * DeployContract Messages
 *
 * This contains all the text for the DeployContract component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeployContract';

export default defineMessages({
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Contract',
  },
  btnConfirmInfo: {
    id: `${scope}.btnConfirmInfo`,
    defaultMessage: 'Confirm Info',
  },
  typeDeploy: {
    id: `${scope}.typeDeploy`,
    defaultMessage: 'Deploy Contract',
  },
  typeCall: {
    id: `${scope}.typeCall`,
    defaultMessage: 'Call Contract',
  },
});
