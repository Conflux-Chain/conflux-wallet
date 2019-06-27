/*
 * NetworkLabel Messages
 *
 * This contains all the text for the NetworkLabel component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.NetworkLabel';

export default defineMessages({
  loadingTitle: {
    id: `${scope}.loadingTitle`,
    defaultMessage: 'Loading Network',
  },
  networkName: {
    id: `${scope}.networkName`,
    defaultMessage: 'Network Name: ',
  },
  blockNumber: {
    id: `${scope}.blockNumber`,
    defaultMessage: 'blockNumber: ',
  },
});
