/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

// antd locale
import { LocaleProvider as AntdLocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale, messages } = this.props;
    // add antd locale support
    let antdLocale = null;
    switch (locale) {
      case 'en':
        antdLocale = enUS;
        break;
      case 'zh':
        antdLocale = zhCN;
        break;
      default:
        antdLocale = enUS;
        break;
    }

    return (
      <AntdLocaleProvider locale={antdLocale}>
        <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
          {React.Children.only(this.props.children)}
        </IntlProvider>
      </AntdLocaleProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageProvider);
