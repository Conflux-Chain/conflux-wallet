/*
 * CheckBalanceStatus Messages
 *
 * This contains all the text for the CheckBalanceStatus component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.CheckBalancesStatus';

export default defineMessages({
  checkingBalances: {
    id: `${scope}.checkingBalances`,
    defaultMessage: 'Checking Balances ....',
  },
  checkSuccess: {
    id: `${scope}.checkSuccess`,
    defaultMessage: 'Balances checked on {time}',
  },
  checkFailure: {
    id: `${scope}.checkFailure`,
    defaultMessage: 'Balances wasnt checked yet',
  },
});
