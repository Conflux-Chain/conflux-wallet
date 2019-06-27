/*
 * RestoreWalletModal Messages
 *
 * This contains all the text for the RestoreWalletModal component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.RestoreWalletModal';

export default defineMessages({
  placeholderSeed: {
    id: `${scope}.placeholderSeed`,
    defaultMessage: 'Enter seed',
  },
  placeholderPassword: {
    id: `${scope}.placeholderPassword`,
    defaultMessage: 'Enter password for keystore encryption',
  },
});
