/**
 *
 * LockButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';
// import styled from 'styled-components';
// import styled from 'styled-components';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

function LockButton(props) {
  const { onLockWallet, password, onUnlockWallet, intl } = props;

  if (password) {
    return (
      <Popconfirm
        key="close_wallet"
        placement="bottom"
        title={intl.formatMessage({ ...messages.popTitle })}
        onConfirm={onLockWallet}
      >
        <Button type="primary" size="large">
          <FormattedMessage {...messages.btnLock} />
          <Icon type="lock" />
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button type="primary" size="large" onClick={onUnlockWallet}>
      <FormattedMessage {...messages.btnUnlock} />
      <Icon type="unlock" />
    </Button>
  );
}

LockButton.propTypes = {
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(LockButton);
