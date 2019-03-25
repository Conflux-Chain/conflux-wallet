/**
 *
 * GenerateWalletModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button, Alert } from 'antd';

const NewModal = styled(Modal)`
  .ant-alert-with-description {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
  .ant-alert-with-description .ant-alert-icon {
    top: 17px;
    left: 57px;
    font-size: 17px;
    font-weight: bold;
  }
  .ant-alert-info {
    background: #fff;
    border-color: #cfcfcf;
  }
  .ant-modal-body {
    padding: 25px 40px;
  }
  .ant-modal-content {
    border-radius: 8px;
  }
  .ant-modal-header {
    background-color: #049cdb;
    padding: 27px 24px;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }
  .ant-modal-title {
    font-size: 30px;
    color: #fff;
  }
  .ant-modal-close {
    color: #fff;
  }
  .ant-modal-close-x {
    width: 75px;
    height: 75px;
    line-height: 75px;
    font-size: 21px;
  }
  .ant-btn {
    border: none;
  }
  .anticon-sync {
    font-size: 28px;
  }
  .ant-modal-footer {
    border-top: none;
    text-align: center;
    padding: 0 0 40px;
  }
  .ant-btn-primary {
    width: 355px;
    height: 46px;
    font-size: 14px;
  }
`;

const Title1 = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  color: #f6ca3a;
  text-align: left;
`;

const Title2 = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
  color: #333;
  text-align: left;
`;

function GenerateWalletModal(props) {
  const {
    isWaringShow,
    isShowGenerateWallet,
    generateWalletLoading,
    // generateWalletError,
    seed,
    password,

    onCloseWarning,
    onGenerateWallet,
    onGenerateWalletCancel,
    onGenerateKeystore,
  } = props;

  return (
    <NewModal
      visible={isShowGenerateWallet}
      title="New Wallet"
      onOk={onGenerateKeystore}
      onCancel={onGenerateWalletCancel}
      footer={[
        <Button key="submit" type="primary" size="large" onClick={onGenerateKeystore}>
          Create Now
        </Button>,
      ]}
    >
      {isWaringShow ? <Title1>Waring:</Title1> : null}
      <Alert
        // message={<b>The seed is imposible to recover if lost</b>}
        description={
          /* eslint-disable react/no-unescaped-entities */
          <b>
            WTF is wallet security?
            <br /> Do not save password in screenshot!
          </b>
          /* eslint-enable */
        }
        type="warning"
        showIcon
        closable
        onClose={onCloseWarning}
      />
      <br />
      <Title2>Seed:</Title2>
      <Alert description={<b>{seed}</b>} type="info" />
      <br />
      <Title2>Password for browser encryption:</Title2>
      <Alert description={<b>{password}</b>} type="info" />
      <br />
      <Button
        shape="circle"
        icon="sync"
        loading={generateWalletLoading}
        key="back"
        size="large"
        onClick={onGenerateWallet}
      />
    </NewModal>
  );
}

GenerateWalletModal.propTypes = {
  isWaringShow: PropTypes.bool,
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  /* generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]), */
  seed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onGenerateWallet: PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
  onCloseWarning: PropTypes.func,
};

export default GenerateWalletModal;
