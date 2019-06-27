/**
 *
 * AddressView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import styled from 'styled-components';

import AddressTable from 'components/AddressTable';
// import AddressListStatus from 'components/AddressListStatus';
// import CheckBalancesStatus from 'components/CheckBalancesStatus';
import AddressTableFooter from 'components/AddressTableFooter';
// import WelcomeText from 'components/WelcomeText';
import HomeContent from 'containers/HomeContent';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = global.isMobile
  ? styled.div`
      /* padding: 0 0 20px; */
      min-height: 100px;
      background: #f2f2f2;
    `
  : styled.div`
      padding: 0 0 20px;
      min-height: 100px;
    `;

function AddressView(props) {
  const {
    subHeaderProps,
    restoreWalletModalProps,
    onLockWallet,
    password,
    onUnlockWallet,
    generateKeystoreLoading,
    generateKeystoreError,
    isComfirmed,
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    onCheckBalances,
    onGenerateAddress,
    networkReady,
    checkingBalanceDoneTime,
    checkingBalances,
    checkingBalancesError,
    addressListLoading,
    addressListError,
    addressListMsg,
    exchangeRates,
    onSelectCurrency,
    convertTo,
    onGetExchangeRates,
    getExchangeRatesDoneTime,
    getExchangeRatesLoading,
    getExchangeRatesError,
    onShowTokenChooser,
    intl,
    onShowDeployContract,
    onShowPrivKey,
    onCloseWallet,
  } = props;

  const addressTableProps = {
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    exchangeRates,
    onSelectCurrency,
    convertTo,
    onShowDeployContract,
    onShowPrivKey,
  };

  const addressTableFooterProps = {
    onLockWallet,
    password,
    onUnlockWallet,

    checkingBalanceDoneTime,
    checkingBalances,
    checkingBalancesError,
    onCheckBalances,
    networkReady,

    isComfirmed,
    onGenerateAddress,
    addressListLoading,
    addressListError,
    addressListMsg,

    onGetExchangeRates,
    getExchangeRatesDoneTime,
    getExchangeRatesLoading,
    getExchangeRatesError,

    onShowTokenChooser,
    onShowDeployContract,
    onCloseWallet,
  };

  let addressViewContent = (
    <Div>
      {generateKeystoreError ? (
        <Alert
          message={intl.formatMessage({ ...messages.generateKeystoreError })}
          description={generateKeystoreError}
          type="error"
          showIcon
        />
      ) : (
        <HomeContent
          subHeaderProps={subHeaderProps}
          restoreWalletModalProps={restoreWalletModalProps}
        />
      )}
    </Div>
  );

  if (isComfirmed) {
    addressViewContent = (
      <Div>
        <AddressTable {...addressTableProps} />
        <AddressTableFooter {...addressTableFooterProps} />
      </Div>
    );
  }
  return (
    <Spin
      spinning={generateKeystoreLoading}
      style={{ position: 'static' }}
      size="large"
      tip={intl.formatMessage({ ...messages.loading })}
    >
      {addressViewContent}
    </Spin>
  );
}

AddressView.propTypes = {
  subHeaderProps: PropTypes.object,
  restoreWalletModalProps: PropTypes.object,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  generateKeystoreLoading: PropTypes.bool,
  generateKeystoreError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  isComfirmed: PropTypes.bool,
  addressMap: PropTypes.oneOfType([PropTypes.object, PropTypes.bool, PropTypes.array]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onShowSendToken: PropTypes.func,
  onShowTokenChooser: PropTypes.func,

  onGenerateAddress: PropTypes.func,
  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  onGetExchangeRates: PropTypes.func,
  getExchangeRatesDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(AddressView);
