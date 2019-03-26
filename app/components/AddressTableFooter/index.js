/**
 *
 * AddressTableFooter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from 'components/IconButton';

import LockButton from 'components/LockButton';
import { Row } from 'antd';

const Div = styled.div`
  .ant-btn {
    padding: 0;
    border-radius: 8px;
  }
`;
const DivPC = styled.div`
  margin-top: 104px;
  .ant-btn {
    margin-right: 44px;
    width: 200px;
    height: 46px;
  }
`;
const DivMobile = styled.div`
  margin-top: 164px;
  .ant-btn {
    margin-bottom: 24px;
    width: 200px;
    height: 44px;
  }
`;

function AddressTableFooter(props) {
  const {
    onLockWallet,
    password,
    onUnlockWallet,

    // checkingBalancesError,
    // checkingBalances,
    // onCheckBalances,
    // networkReady,

    isComfirmed,
    onGenerateAddress,
    addressListLoading,
    addressListError,

    // onGetExchangeRates,
    // getExchangeRatesLoading,
    // getExchangeRatesError,

    // onShowTokenChooser,
  } = props;
  const lockButtonProps = { onLockWallet, password, onUnlockWallet };
  return (
    <Div>
      {global.isMobile ? (
        <DivPC>
          <Row type="flex" justify="center">
            <LockButton key="lock_button" {...lockButtonProps} />
            <IconButton
              text="Add address"
              icon="plus"
              onClick={onGenerateAddress}
              loading={addressListLoading}
              error={addressListError}
              disabled={!isComfirmed}
              popconfirmMsg={false}
            />
            <IconButton style={{ marginRight: 0 }} text="Deploy Contract" />
          </Row>
        </DivPC>
      ) : (
        <DivMobile>
          <Row type="flex" justify="center">
            <LockButton key="lock_button" {...lockButtonProps} />
          </Row>
          <Row type="flex" justify="center">
            <IconButton
              text="Add address"
              icon="plus"
              onClick={onGenerateAddress}
              loading={addressListLoading}
              error={addressListError}
              disabled={!isComfirmed}
              popconfirmMsg={false}
            />
          </Row>
          <Row type="flex" justify="center">
            <IconButton
              style={{ marginRight: 0 }}
              text="Deploy Contract"
              onClick={onGenerateAddress}
              loading={addressListLoading}
              error={addressListError}
              disabled={!isComfirmed}
              popconfirmMsg={false}
            />
          </Row>
        </DivMobile>
      )}
    </Div>
  );
}

AddressTableFooter.propTypes = {
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  isComfirmed: PropTypes.bool,
  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onShowTokenChooser: PropTypes.func,
};

export default AddressTableFooter;
