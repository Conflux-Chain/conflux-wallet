/*
 * SendTo Messages
 *
 * This contains all the text for the SendTo component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SendTo';

export default defineMessages({
  sourceTitle: {
    id: `${scope}.sourceTitle`,
    defaultMessage: 'Receiver',
  },
  placeholderSendTo: {
    id: `${scope}.placeholderSendTo`,
    defaultMessage: 'Send to address',
  },
});
