/*
 * AddressView Messages
 *
 * This contains all the text for the AddressView component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.AddressView';

export default defineMessages({
  generateKeystoreError: {
    id: `${scope}.generateKeystoreError`,
    defaultMessage: 'Generate Keystore Error',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'loading...',
  },
  getExchangeRatesError: {
    id: `${scope}.getExchangeRatesError`,
    defaultMessage: 'Update Exchange Rates Error',
  },
});
