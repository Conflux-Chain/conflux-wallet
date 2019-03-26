/*
 * AddressTableFooterErrors Messages
 *
 * This contains all the text for the AddressTableFooterErrors component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddressTableFooterErrors';

export default defineMessages({
  checkingBalancesError: {
    id: `${scope}.checkingBalancesError`,
    defaultMessage: 'Check Balances Error',
  },
  addressListError: {
    id: `${scope}.addressListError`,
    defaultMessage: 'Add Addresss Error',
  },
  getExchangeRatesError: {
    id: `${scope}.getExchangeRatesError`,
    defaultMessage: 'Update Exchange Rates Error',
  },
});
