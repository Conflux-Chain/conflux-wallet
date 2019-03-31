/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'English',
  },
  zh: {
    id: `${scope}.zh`,
    defaultMessage: '中文',
  },
  selectLang: {
    id: `${scope}.selectLang`,
    defaultMessage: 'Select Language',
  },
});
