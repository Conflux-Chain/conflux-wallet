/*
 * SubHeader Messages
 *
 * This contains all the text for the SubHeader component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SubHeader';

export default defineMessages({
  btnNewWallet: {
    id: `${scope}.btnNewWallet`,
    defaultMessage: 'New wallet',
  },
  btnRestoreWallet: {
    id: `${scope}.btnRestoreWallet`,
    defaultMessage: 'Restore wallet',
  },
  btnCloseWallet: {
    id: `${scope}.btnCloseWallet`,
    defaultMessage: 'Close wallet',
  },
  closeWalletConfirmMsg: {
    id: `${scope}.closeWalletConfirmMsg`,
    defaultMessage: 'Wallet will be deleted from memory and LocalStorage',
  },
});
