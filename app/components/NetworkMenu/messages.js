/*
 * NetworkMenu Messages
 *
 * This contains all the text for the NetworkMenu component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.NetworkMenu';

export default defineMessages({
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Select Conflux network',
  },
  Offline: {
    id: `${scope}.Offline`,
    defaultMessage: 'Offline',
  },
  Testnet: {
    id: `${scope}.Testnet`,
    defaultMessage: 'Testnet',
  },
  'Local RPC': {
    id: `${scope}.LocalRPC`,
    defaultMessage: 'Local RPC',
  },
});
