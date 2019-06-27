/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../App/constants'; // eslint-disable-line

const initialState = fromJS({
  locale: ['en', 'zh'].includes(localStorage.getItem('conflux_wallet_locale'))
    ? localStorage.getItem('conflux_wallet_locale')
    : DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      // 本地缓存 locale
      localStorage.setItem('conflux_wallet_locale', action.locale);
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
