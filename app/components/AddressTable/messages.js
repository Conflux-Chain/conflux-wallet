/*
 * AddressTable Messages
 *
 * This contains all the text for the AddressTable component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddressTable';

export default defineMessages({
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  icon: {
    id: `${scope}.icon`,
    defaultMessage: 'Icon',
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
