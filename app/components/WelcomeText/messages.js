/*
 * WelcomeText Messages
 *
 * This contains all the text for the WelcomeText component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.WelcomeText';

export default defineMessages({
  welcomeTitle: {
    id: `${scope}.welcomeTitle`,
    defaultMessage: 'Welcome to Conflux Wallet',
  },
  welcomeDes: {
    id: `${scope}.welcomeDes`,
    defaultMessage: `<p>Conflux wallet is a zero client. Connection to Conflux network is made via local node.</p><p>Keystore is encrypted using the password. When the wallet is locked, you can only view balances.</p><p>All keys are saved inside the browser and never sent.</p>`,
  },
});
