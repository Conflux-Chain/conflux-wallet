/*
 * IconButton Messages
 *
 * This contains all the text for the IconButton component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.IconButton';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: '{err} - Click to retry',
  },
});
