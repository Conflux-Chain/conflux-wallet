/**
 *
 * SendToken
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import SendFrom from 'components/SendFrom';
import SendTo from 'components/SendTo';
import SendAmount from 'components/SendAmount';
// import SendTokenSymbol from 'components/SendTokenSymbol';
import SendGasPrice from 'components/SendGasPrice';
import SendConfirmationView from 'components/SendConfirmationView';
import SendProgress from 'components/SendProgress';
import SendErrorInfo from 'components/SendErrorInfo';

import { makeSelectAddressList, makeSelectTokenInfoList } from 'containers/HomePage/selectors';
import { makeSelectTxExplorer } from 'containers/Header/selectors';
import messages from './messages';

import {
  changeFrom,
  changeAmount,
  changeTo,
  changeGasPrice,
  confirmSendTransaction,
  sendTransaction,
  abortTransaction,
} from './actions';

import {
  makeSelectFrom,
  makeSelectTo,
  makeSelectAmount,
  makeSelectGasPrice,
  makeSelectLocked,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectIsSendComfirmationLocked,
  makeSelectSendInProgress,
  makeSelectSendError,
  makeSelectSendTx,
  makeSelectSendTokenSymbol,
} from './selectors';
import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';

const NewModal = styled(Modal)`
  @media only screen and (min-device-width: 300px) and (max-device-width: 768px) {
    width: 90%;
  }
  @media screen and (min-width: 768px) {
    width: 426px;
  }
  .ant-modal-body {
    padding: 0 35px;
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
    padding: 0 0 35px;
  }
  .ant-btn-primary {
    @media only screen and (min-device-width: 300px) and (max-device-width: 768px) {
      width: 90%;
    }
    @media screen and (min-width: 768px) {
      width: 355px;
    }
    height: 46px;
    font-size: 14px;
    border-radius: 8px;
  }
`;

function SendToken(props) {
  const {
    isShowSendToken,
    onHideSendToken,

    from,
    to,
    addressList,
    onChangeFrom,
    amount,
    locked,
    onChangeAmount,
    onChangeTo,
    gasPrice,
    onChangeGasPrice,
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    isSendComfirmationLocked,
    onConfirmSendTransaction,
    onSendTransaction,
    onAbortTransaction,

    sendTokenSymbol,
    tokenInfoList,

    sendInProgress,
    sendError,
    sendTx,

    txExplorer,
    intl,
  } = props;

  const SendFromProps = { from, addressList, onChangeFrom, locked };
  const SendAmountProps = { amount, onChangeAmount, locked };
  const SendToProps = { to, onChangeTo, locked };
  const SendGasPriceProps = { gasPrice, onChangeGasPrice, locked };

  const SendConfirmationViewProps = {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onSendTransaction,
    onAbortTransaction,
    sendInProgress,
    isSendComfirmationLocked,
    sendError,
  };
  const SendProgressProps = { sendInProgress, sendError, sendTx, txExplorer };

  const SendTokenSymbolProps = {
    sendTokenSymbol,
    tokenInfoList,
    onChangeFrom,
    locked,
  };

  const modalFooter = [
    <Button key="reset" type="primary" size="large" onClick={onAbortTransaction}>
      Reset
    </Button>,
  ];

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <NewModal
        visible={isShowSendToken}
        title={intl.formatMessage({ ...messages.sendTokenTitle })}
        onOk={onHideSendToken}
        onCancel={onHideSendToken}
        footer={modalFooter}
      >
        <SendFrom {...SendFromProps} />
        <SendAmount {...SendAmountProps} />
        {/* <SendTokenSymbol {...SendTokenSymbolProps} /> */}
        <SendTo {...SendToProps} />
        <SendGasPrice {...SendGasPriceProps} />
        <br />
        <Button onClick={onConfirmSendTransaction} disabled={locked} type="primary">
          <FormattedMessage {...messages.btnCreateTx} />
        </Button>
        <br />
        <SendConfirmationView {...SendConfirmationViewProps} />
        <br />
        <SendProgress {...SendProgressProps} />
        {/* <SendErrorInfo /> */}
      </NewModal>
    </div>
  );
}

SendToken.propTypes = {
  onChangeFrom: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  onChangeTo: PropTypes.func.isRequired,
  onChangeGasPrice: PropTypes.func.isRequired,
  onConfirmSendTransaction: PropTypes.func.isRequired,
  onSendTransaction: PropTypes.func.isRequired,
  onAbortTransaction: PropTypes.func.isRequired,

  from: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  amount: PropTypes.number,
  gasPrice: PropTypes.number,
  sendTokenSymbol: PropTypes.string,
  tokenInfoList: PropTypes.array,

  locked: PropTypes.bool,

  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isSendComfirmationLocked: PropTypes.bool,

  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isShowSendToken: PropTypes.bool,
  onHideSendToken: PropTypes.func,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  txExplorer: PropTypes.string,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  from: makeSelectFrom(),
  to: makeSelectTo(),
  amount: makeSelectAmount(),
  addressList: makeSelectAddressList(),
  gasPrice: makeSelectGasPrice(),

  sendTokenSymbol: makeSelectSendTokenSymbol(),
  tokenInfoList: makeSelectTokenInfoList(),

  locked: makeSelectLocked(),

  comfirmationLoading: makeSelectComfirmationLoading(),
  confirmationError: makeSelectConfirmationError(),
  confirmationMsg: makeSelectConfirmationMsg(),

  isSendComfirmationLocked: makeSelectIsSendComfirmationLocked(),

  sendInProgress: makeSelectSendInProgress(),
  sendError: makeSelectSendError(),
  sendTx: makeSelectSendTx(),

  txExplorer: makeSelectTxExplorer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeFrom: (address, sendTokenSymbol) => {
      dispatch(changeFrom(address, sendTokenSymbol));
    },
    onChangeAmount: (amount) => {
      dispatch(changeAmount(amount));
    },
    onChangeTo: (evt) => {
      dispatch(changeTo(evt.target.value));
    },
    onChangeGasPrice: (value) => {
      dispatch(changeGasPrice(value));
    },
    onConfirmSendTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmSendTransaction());
    },
    onAbortTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(abortTransaction());
    },
    onSendTransaction: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(sendTransaction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'sendtoken', reducer });
// const withSaga = injectSaga({ key: 'sendtoken', saga });

export default injectIntl(
  compose(
    withReducer,
    // withSaga,
    withConnect
  )(SendToken)
);
