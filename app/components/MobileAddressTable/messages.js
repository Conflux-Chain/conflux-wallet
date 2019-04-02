/*
 * MoblieAddressTable Messages
 *
 * This contains all the text for the MoblieAddressTable component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.MoblieAddressTable';

export default defineMessages({
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  balance: {
    id: `${scope}.balance`,
    defaultMessage: 'Balance',
  },
  action: {
    id: `${scope}.action`,
    defaultMessage: 'Action',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  deployContract: {
    id: `${scope}.deployContract`,
    defaultMessage: 'Contract',
  },
});
