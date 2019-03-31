/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.NotFoundPage';

export default defineMessages({
  notFound: {
    id: `${scope}.notFound`,
    defaultMessage: '404 Page not found',
  },
});
