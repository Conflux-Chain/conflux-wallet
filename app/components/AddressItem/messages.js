/*
 * AddressItem Messages
 *
 * This contains all the text for the AddressItem component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.AddressItem';

export default defineMessages({
  balance: {
    id: `${scope}.balance`,
    defaultMessage: 'Balance',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
});
