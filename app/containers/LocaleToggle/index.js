/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Menu, Button, Dropdown, Icon } from 'antd';

import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

const MenuItem = Menu.Item;

const PCMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    color: #666;
  }
  .ant-dropdown-menu-item-disabled {
    color: rgba(0, 0, 0, 0.25);
  }
  .ant-dropdown-menu-item-selected,
  .ant-dropdown-menu-item-selected > a {
    background-color: #5acfff;
    color: #fff;
  }
`;
const StyledButton = styled(Button)`
  border: none;
  font-size: 14px;
  color: #049cdb;
`;

const StyledMenuItem = styled(MenuItem)`
  line-height: 40px;
`;

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const options = appLocales.map((value) => (
      <StyledMenuItem key={value}>
        <a tabIndex="0" role="button" onClick={() => this.props.onLocaleToggle(value)}>
          <FormattedMessage {...messages[value]} />
        </a>
      </StyledMenuItem>
    ));

    const menu = (
      <PCMenu>
        <StyledMenuItem disabled key="title">
          <FormattedMessage {...messages.selectLang} />
        </StyledMenuItem>
        {options}
      </PCMenu>
    );

    return (
      <Dropdown overlay={menu}>
        <StyledButton size="large">
          {<FormattedMessage {...messages[this.props.locale]} />}
          <Icon type="caret-down" />
        </StyledButton>
      </Dropdown>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({
    locale,
  })
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (value) => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleToggle);
