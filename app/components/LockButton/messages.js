/*
 * LockButton Messages
 *
 * This contains all the text for the LockButton component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.LockButton';

export default defineMessages({
  btnLock: {
    id: `${scope}.btnLock`,
    defaultMessage: 'Lock Wallet',
  },
  btnUnlock: {
    id: `${scope}.btnUnlock`,
    defaultMessage: 'Unlock Wallet',
  },
  popTitle: {
    id: `${scope}.popTitle`,
    defaultMessage: 'Comfirm locking wallet',
  },
});
