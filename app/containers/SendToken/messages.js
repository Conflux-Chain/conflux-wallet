/*
 * SendToken Messages
 *
 * This contains all the text for the SendToken component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SendToken';

export default defineMessages({
  sendTokenTitle: {
    id: `${scope}.sendTokenTitle`,
    defaultMessage: 'Send Token',
  },
  btnCreateTx: {
    id: `${scope}.btnCreateTx`,
    defaultMessage: 'Create transaction',
  },
});
