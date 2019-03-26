/**
 *
 * LockButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
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
        <Button icon="lock" type="default" size="large">
          <FormattedMessage {...messages.btnLock} />
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button icon="unlock" type="default" size="large" onClick={onUnlockWallet}>
      <FormattedMessage {...messages.btnUnlock} />
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
