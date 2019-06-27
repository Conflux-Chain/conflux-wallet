/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/* Components:  */
import GenerateWalletModal from 'components/GenerateWalletModal';
import AddressView from 'components/AddressView';
import SendToken from 'containers/SendToken';
import TokenChooser from 'containers/TokenChooser';
import PageFooter from 'components/PageFooter';
import SubHeader from 'components/SubHeader';
import { Content } from 'components/PageFooter/sticky';
import DeployContract from 'containers/DeployContract';
/* Header: */
import Header from 'containers/Header';
import { loadNetwork, checkBalances, getExchangeRates } from 'containers/Header/actions';
import {
  makeSelectNetworkReady,
  makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,
  makeSelectGetExchangeRatesDoneTime,
  makeSelectGetExchangeRatesLoading,
  makeSelectGetExchangeRatesError,
} from 'containers/Header/selectors';

/* General */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

/* HomePage */
import {
  generateWallet,
  generateWalletChangePassword,
  closeWarning,
  generateWalletCancel,
  showRestoreWallet,
  restoreWalletCancel,
  generateKeystore,
  changeUserSeed,
  changeUserPassword,
  restoreWalletFromSeed,
  showSendToken,
  hideSendToken,
  showTokenChooser,
  hideTokenChooser,
  generateAddress,
  lockWallet,
  unlockWallet,
  selectCurrency,
  closeWallet,
  saveWallet,
  loadWallet,
  showDeployContract,
  hideDeployContract,
  showPrivKey,
} from './actions';

import {
  makeSelectIsWarningShow,
  makeSelectIsShowGenerateWallet,
  makeSelectGenerateWalletLoading,
  makeSelectGenerateWalletError,
  makeSelectSeed,
  makeSelectGenerateKeystoreLoading,
  makeSelectGenerateKeystoreError,
  makeSelectRestoreWalletError,
  makeSelectPassword,
  makeSelectIsComfirmed,
  makeSelectUserSeed,
  makeSelectUserPassword,
  makeSelectAddressMap,
  makeSelectShowRestoreWallet,
  makeSelectIsShowSendToken,
  makeSelectIsShowTokenChooser,
  makeSelectAddressListLoading,
  makeSelectAddressListError,
  makeSelectAddressListMsg,
  makeSelectExchangeRates,
  makeSelectConvertTo,
  makeSelectSaveWalletLoading,
  makeSelectSaveWalletError,
  makeSelectLoadWalletLoading,
  makeSelectLoadwalletError,
  makeSelectTokenDecimalsMap,
  makeSelectIsShowDeployContract,
} from './selectors';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onLoadWallet();
  }

  render() {
    const {
      onGenerateWallet,
      onGenerateWalletChangePassword,
      onGenerateWalletCancel,
      isWarningShow,
      isShowGenerateWallet,
      generateWalletLoading,
      generateWalletError,

      generateKeystoreLoading,
      generateKeystoreError,
      seed,
      password,
      restoreWalletError,
      onGenerateKeystore,
      onGenerateAddress,
      onCheckBalances,
      isComfirmed,
      // addressList,
      addressMap,
      tokenDecimalsMap,

      onCloseWarning,
      onShowRestoreWallet,
      isShowRestoreWallet,
      userSeed,
      userPassword,
      onChangeUserSeed,
      onChangeUserPassword,
      onRestoreWalletFromSeed,
      onRestoreWalletCancel,

      isShowSendToken,
      onShowSendToken,
      onHideSendToken,
      onShowTokenChooser,
      onHideTokenChooser,

      isShowTokenChooser,

      addressListLoading,
      addressListError,
      addressListMsg,

      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,

      onLockWallet,
      onUnlockWallet,

      exchangeRates,
      onSelectCurrency,
      convertTo,

      onGetExchangeRates,
      getExchangeRatesDoneTime,
      getExchangeRatesLoading,
      getExchangeRatesError,
      onCloseWallet,

      onSaveWallet,
      saveWalletLoading,
      saveWalletError,
      onLoadWallet,
      loadWalletLoading,
      loadWalletError,

      isShowDeployContract,
      onShowDeployContract,
      onHideDeployContract,
      onShowPrivKey,
    } = this.props;

    const subHeaderProps = {
      onGenerateWallet,
      onShowRestoreWallet,
      isComfirmed,
      onCloseWallet,
      onLockWallet,
      password,
      onUnlockWallet,

      onSaveWallet,
      saveWalletLoading,
      saveWalletError,
      onLoadWallet,
      loadWalletLoading,
      loadWalletError,
      onRestoreWalletFromSeed,
    };

    const generateWalletProps = {
      isWarningShow,
      isShowGenerateWallet,
      generateWalletLoading,
      generateWalletError,

      seed,
      password,
      onGenerateWalletChangePassword,

      onGenerateWallet,
      onGenerateWalletCancel,
      onGenerateKeystore,
      onCloseWarning,
    };
    const restoreWalletModalProps = {
      isShowRestoreWallet,
      userSeed,
      userPassword,
      restoreWalletError,
      onChangeUserSeed,
      onChangeUserPassword,
      onRestoreWalletCancel,
      onRestoreWalletFromSeed,
    };

    const addressViewProps = {
      onLockWallet,
      password,
      onUnlockWallet,

      generateKeystoreLoading,
      generateKeystoreError,
      isComfirmed,
      // addressList,
      addressMap,
      tokenDecimalsMap,

      onShowSendToken,
      onShowTokenChooser,

      onCheckBalances,
      onGenerateAddress,
      addressListLoading,
      addressListError,
      addressListMsg,
      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,
      onSelectCurrency,
      exchangeRates,
      convertTo,
      onGetExchangeRates,
      getExchangeRatesDoneTime,
      getExchangeRatesLoading,
      getExchangeRatesError,

      onShowDeployContract,
      onCloseWallet,
      onShowPrivKey,
    };

    const sendTokenProps = { isShowSendToken, onHideSendToken };
    const tokenChooserProps = { isShowTokenChooser, onHideTokenChooser };
    const DeployContractProps = { isShowDeployContract, onHideDeployContract };
    return (
      <div>
        <Content>
          <Header />
          <AddressView
            {...addressViewProps}
            subHeaderProps={subHeaderProps}
            restoreWalletModalProps={restoreWalletModalProps}
          />
          <SendToken {...sendTokenProps} />
          <TokenChooser {...tokenChooserProps} />
          {/* <HomeContent subHeaderProps={subHeaderProps}/> */}
          {/* <SubHeader {...subHeaderProps} /> */}
          <GenerateWalletModal {...generateWalletProps} />
          <DeployContract {...DeployContractProps} />
        </Content>
        <PageFooter />
      </div>
    );
  }
}

HomePage.propTypes = {
  onCloseWarning: PropTypes.func,
  onGenerateWallet: PropTypes.func,
  onGenerateWalletChangePassword: PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  isWarningShow: PropTypes.bool,
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  generateWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  seed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  generateKeystoreLoading: PropTypes.bool,
  generateKeystoreError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  // onInitSeed: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
  onGenerateAddress: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,

  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  userPassword: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeUserPassword: PropTypes.func,
  restoreWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onRestoreWalletFromSeed: PropTypes.func,
  onRestoreWalletCancel: PropTypes.func,

  onCheckBalances: PropTypes.func,

  onLockWallet: PropTypes.func,
  onUnlockWallet: PropTypes.func,

  isComfirmed: PropTypes.bool,
  addressMap: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),

  isShowSendToken: PropTypes.bool,
  onShowSendToken: PropTypes.func,
  onHideSendToken: PropTypes.func,

  isShowTokenChooser: PropTypes.bool,
  onShowTokenChooser: PropTypes.func,
  onHideTokenChooser: PropTypes.func,

  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

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
  onCloseWallet: PropTypes.func,

  onSaveWallet: PropTypes.func,
  saveWalletLoading: PropTypes.bool,
  saveWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onLoadWallet: PropTypes.func,
  loadWalletLoading: PropTypes.bool,
  loadWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  isShowDeployContract: PropTypes.bool,
  onShowDeployContract: PropTypes.func,
  onHideDeployContract: PropTypes.func,
  onShowPrivKey: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGenerateWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateWallet());
    },
    onGenerateWalletChangePassword: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateWalletChangePassword(evt.target.value));
    },
    onCloseWarning: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(closeWarning());
    },
    onGenerateWalletCancel: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateWalletCancel());
    },
    onGenerateKeystore: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateKeystore());
    },
    onGenerateAddress: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAddress());
    },
    onLoadNetwork: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork('local'));
    },
    onShowRestoreWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(showRestoreWallet());
    },
    onRestoreWalletCancel: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(restoreWalletCancel());
    },
    onChangeUserSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // console.log(evt.target);
      dispatch(changeUserSeed(evt.target.value));
    },
    onChangeUserPassword: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // console.log(evt.target);
      dispatch(changeUserPassword(evt.target.value));
    },
    onRestoreWalletFromSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(restoreWalletFromSeed());
    },
    onCheckBalances: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkBalances());
    },
    onShowSendToken: (address, tokenSymbol) => {
      dispatch(showSendToken(address, tokenSymbol));
    },
    onHideSendToken: () => {
      dispatch(hideSendToken());
    },
    onShowTokenChooser: () => {
      dispatch(showTokenChooser());
    },
    onHideTokenChooser: () => {
      dispatch(hideTokenChooser());
    },
    onLockWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(lockWallet());
    },
    onUnlockWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(unlockWallet());
    },
    onSelectCurrency: (convertTo) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectCurrency(convertTo));
    },
    onGetExchangeRates: () => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getExchangeRates());
    },
    onCloseWallet: () => {
      dispatch(closeWallet());
    },
    onSaveWallet: () => {
      dispatch(saveWallet());
    },
    onLoadWallet: () => {
      dispatch(loadWallet());
    },
    onShowDeployContract: (address) => {
      dispatch(showDeployContract(address));
    },
    onHideDeployContract: () => {
      dispatch(hideDeployContract());
    },
    onShowPrivKey: (address) => {
      dispatch(showPrivKey(address));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isWarningShow: makeSelectIsWarningShow(),
  isShowGenerateWallet: makeSelectIsShowGenerateWallet(),
  generateWalletLoading: makeSelectGenerateWalletLoading(),
  generateWalletError: makeSelectGenerateWalletError(),
  seed: makeSelectSeed(),
  password: makeSelectPassword(),

  generateKeystoreLoading: makeSelectGenerateKeystoreLoading(),
  generateKeystoreError: makeSelectGenerateKeystoreError(),
  restoreWalletError: makeSelectRestoreWalletError(),
  isComfirmed: makeSelectIsComfirmed(),
  // addressList: makeSelectAddressList(),
  addressMap: makeSelectAddressMap(),
  tokenDecimalsMap: makeSelectTokenDecimalsMap(),
  // keystore: makeSelectKeystore(),
  isShowRestoreWallet: makeSelectShowRestoreWallet(),
  userSeed: makeSelectUserSeed(),
  userPassword: makeSelectUserPassword(),

  isShowSendToken: makeSelectIsShowSendToken(),
  isShowTokenChooser: makeSelectIsShowTokenChooser(),

  addressListLoading: makeSelectAddressListLoading(),
  addressListError: makeSelectAddressListError(),
  addressListMsg: makeSelectAddressListMsg(),

  networkReady: makeSelectNetworkReady(),
  checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(),

  // exchangeRates: makeSelectExchangeRates(),
  exchangeRates: makeSelectExchangeRates(),
  convertTo: makeSelectConvertTo(),

  getExchangeRatesDoneTime: makeSelectGetExchangeRatesDoneTime(),
  getExchangeRatesLoading: makeSelectGetExchangeRatesLoading(),
  getExchangeRatesError: makeSelectGetExchangeRatesError(),

  saveWalletLoading: makeSelectSaveWalletLoading(),
  saveWalletError: makeSelectSaveWalletError(),
  loadWalletLoading: makeSelectLoadWalletLoading(),
  loadWalletError: makeSelectLoadwalletError(),

  isShowDeployContract: makeSelectIsShowDeployContract(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
