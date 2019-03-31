/*
 * SendProgress Messages
 *
 * This contains all the text for the SendProgress component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SendProgress';

export default defineMessages({
  sendingTip: {
    id: `${scope}.sendingTip`,
    defaultMessage: 'Sending...',
  },
  alertErr1: {
    id: `${scope}.alertErr1`,
    defaultMessage: 'Send Error',
  },
  sendSuccessTip: {
    id: `${scope}.sendSuccessTip`,
    defaultMessage: 'Send sucessfull',
  },
});
