/**
 *
 * SubHeader
 *
 */

import React from 'react';
import { Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockButton from 'components/LockButton';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

// import IconButton from 'components/IconButton';
const Div = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: space-between;
  .ant-btn {
    width: 45%;
    height: 48px;
    border-radius: 10px;
    padding: 0;
  }

  .anticon-lock {
    color: red;
  }
  .anticon-unlock {
    color: blue;
  }
`;

function SubHeader(props) {
  const {
    onGenerateWallet,
    onShowRestoreWallet,
    isComfirmed,
    onCloseWallet,
    onLockWallet,
    password,
    onUnlockWallet,
    onRestoreWalletFromSeed,
    intl,
    /* optional laod / save buttons
     onSaveWallet, saveWalletLoading, saveWalletError,
     onLoadWallet, loadWalletLoading, loadWalletError, */
  } = props;

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };

  const noWalletSubHeader = [
    <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet}>
      <FormattedMessage {...messages.btnNewWallet} />
    </Button>,
    <Button key="restore_wallet" type="default" size="large" onClick={onRestoreWalletFromSeed}>
      <FormattedMessage {...messages.btnRestoreWallet} />
    </Button>,
    /* optional laod / save buttons
     <IconButton
      key="load"
      text="Load from storage"
      icon="upload"
      onClick={onLoadWallet}
      loading={loadWalletLoading}
      error={loadWalletError}
    />,*/
  ];

  const existingWalletSubHeader = [
    <LockButton key="lock_button" {...lockButtonProps} />,
    <Popconfirm
      key="close_wallet"
      placement="bottom"
      title={intl.formatMessage({ ...messages.closeWalletConfirmMsg })}
      onConfirm={onCloseWallet}
    >
      <Button key="close_wallet" type="default" icon="close-square-o" size="large">
        <FormattedMessage {...messages.btnCloseWallet} />
      </Button>
    </Popconfirm>,
    /* optional laod / save buttons
    <IconButton
      key="save"
      text="Save to disk"
      icon="download"
      onClick={onSaveWallet}
      loading={saveWalletLoading}
      error={saveWalletError}
      popconfirmMsg="Encrypted wallet will be saved to browser localStorage"
    />, */
  ];

  const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;

  return <Div>{subHeader}</Div>;
}

SubHeader.propTypes = {
  onGenerateWallet: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  isComfirmed: PropTypes.bool,
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
  intl: intlShape.isRequired,

  /* optional laod / save buttons
  onSaveWallet: PropTypes.func,
  saveWalletLoading: PropTypes.bool,
  saveWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
   onLoadWallet: PropTypes.func,
  loadWalletLoading: PropTypes.bool,
  loadWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]), */
};

export default injectIntl(SubHeader);
