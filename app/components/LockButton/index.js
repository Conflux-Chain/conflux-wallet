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

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function LockButton(props) {
  const { onLockWallet, password, onUnlockWallet } = props;

  if (password) {
    return (
      <Popconfirm
        key="close_wallet"
        placement="bottom"
        title="Comfirm locking wallet"
        onConfirm={onLockWallet}
        okText="Confirm"
        cancelText="Abort"
      >
        <Button type="primary" size="large">
          Lock Wallet
          <Icon type="lock" />
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button type="primary" size="large" onClick={onUnlockWallet}>
      Unlock Wallet
      <Icon type="unlock" />
    </Button>
  );
}

LockButton.propTypes = {
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
};

export default LockButton;
