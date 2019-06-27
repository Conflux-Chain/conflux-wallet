/**
 *
 * RestoreWalletModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Icon } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .ant-input {
    border: none;
    border-bottom: 1px solid #d3dfef;
    margin: 30px auto 10px;
  }
`;
const Text = styled.text`
  font-size: 14px;
  color: #fd4141;
`;

function RestoreWalletModal(props) {
  const {
    // isShowRestoreWallet,
    userSeed,
    userPassword,
    // restoreWalletError,
    onChangeUserSeed,
    onChangeUserPassword,
    // onRestoreWalletCancel,
    // onRestoreWalletFromSeed,
    intl,
  } = props;
  // const suffix = userSeed ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
  // const errorComponent = (
  //   <Span key="error">
  //     <Tooltip placement="bottom" title={restoreWalletError}>
  //       <Icon type="close-circle-o" style={{ color: 'red', marginRight: '5px' }} />
  //     </Tooltip>
  //   </Span>
  // );

  return (
    // <Modal
    //   visible={isShowRestoreWallet}
    //   title="Restore Wallet"
    //   onOk={onRestoreWalletCancel}
    //   onCancel={onRestoreWalletCancel}
    //   footer={[
    //     restoreWalletError ? errorComponent : null,
    //     <Button key="submit" type="primary" size="large" onClick={onRestoreWalletFromSeed}>
    //       Restore
    //     </Button>,
    //   ]}
    // >
    <Div>
      <Input
        placeholder={intl.formatMessage({ ...messages.placeholderSeed })}
        value={userSeed}
        onChange={onChangeUserSeed}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      {/* <Text> */}
      {/* <Icon type="close-circle" style={{ color: 'red', marginRight: '5px' }} /> */}
      {/* seed error */}
      {/* </Text> */}
      <Input
        placeholder={intl.formatMessage({ ...messages.placeholderPassword })}
        value={userPassword}
        onChange={onChangeUserPassword}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      {/* <Text> */}
      {/* <Icon type="close-circle" style={{ color: 'red', marginRight: '5px' }} /> */}
      {/* password error */}
      {/* </Text> */}
    </Div>
  );
}

RestoreWalletModal.propTypes = {
  // isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  userPassword: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeUserPassword: PropTypes.func,
  // restoreWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  // onRestoreWalletCancel: PropTypes.func,
  // onRestoreWalletFromSeed: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(RestoreWalletModal);
