/**
 *
 * IconButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Tooltip, Icon } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const ErrorSpan = styled.span`
  .anticon {
    color: #ff9000;
  }
  .ant-btn {
    color: #ff9000;
  }
`;

const Btn = ({
  error,
  popconfirm,
  text,
  loading,
  disabled,
  popconfirmMsg,
  onClick,
  icon,
  ...btnProps
}) => (
  <Button
    // icon={icon}
    type="primary"
    size="large"
    onClick={popconfirmMsg ? null : onClick}
    disabled={disabled}
    loading={loading}
    {...btnProps}
  >
    {text}
    {icon ? <Icon type={icon} /> : null}
  </Button>
);
Btn.propTypes = {
  popconfirm: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,

  onClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  popconfirmMsg: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

const handlePopconfirm = (popConfirmText, onClick, component) => {
  if (popConfirmText) {
    return (
      <Popconfirm placement="top" title={popConfirmText} onConfirm={onClick}>
        {component}
        <span />
      </Popconfirm>
    );
  }
  return component;
};

function IconButton(props) {
  const { text, icon, onClick, loading, error, disabled, popconfirmMsg, intl, ...btnProps } = props;

  const handleError = (err, component) => {
    if (err) {
      return (
        <Tooltip placement="bottom" title={intl.formatMessage({ ...messages.title }, { err })}>
          <ErrorSpan>{component}</ErrorSpan>
        </Tooltip>
      );
    }
    return component;
  };

  const BtnProps = { text, icon, onClick, loading, error, disabled, popconfirmMsg, ...btnProps };
  return handleError(error, handlePopconfirm(popconfirmMsg, onClick, <Btn {...BtnProps} />));
}

IconButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,

  onClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  popconfirmMsg: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(IconButton);
