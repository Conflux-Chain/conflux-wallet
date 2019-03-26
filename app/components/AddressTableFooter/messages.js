/*
 * AddressTableFooter Messages
 *
 * This contains all the text for the AddressTableFooter component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.AddressTableFooter';

export default defineMessages({
  addAddress: {
    id: `${scope}.addAddress`,
    defaultMessage: 'Add address',
  },
  checkBalance: {
    id: `${scope}.checkBalance`,
    defaultMessage: 'Check balances',
  },
  popconfirmMsg: {
    id: `${scope}.popconfirmMsg`,
    defaultMessage: 'Refresh balance?',
  },
  token: {
    id: `${scope}.token`,
    defaultMessage: 'Token',
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
  removeEmpty: {
    id: `${scope}.removeEmpty`,
    defaultMessage: 'Remove empty',
  },
});
