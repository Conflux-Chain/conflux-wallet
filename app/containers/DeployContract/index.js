/**
 *
 * DeployContract
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// eslint-disable-next-line import/no-unresolved
import DeployContractCode from 'components/DeployContractCode';
import DeployContractForm from 'components/DeployContractForm';
// import DeployContractGas from 'components/DeployContractGas';
import DeployContractGasPrice from 'components/DeployContractGasPrice';
import DeployContractConfirmationView from 'components/DeployContractConfirmationView';
import DeployContractProgress from 'components/DeployContractProgress';

import { makeSelectAddressList } from 'containers/HomePage/selectors';

import {
  changeCode,
  changeFrom,
  changeGas,
  changeGasPrice,
  confirmDeployContract,
  deployContract,
  abortDeploy,
} from './actions';

import {
  makeSelectCode,
  makeSelectFrom,
  makeSelectGas,
  makeSelectGasPrice,
  makeSelectLocked,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectIsDeployComfirmationLocked,
  makeSelectDeployInProgress,
  makeSelectDeployError,
  makeSelectDeploySuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const NewModal = styled(Modal)`
  @media only screen and (min-device-width: 300px) and (max-device-width: 1025px) {
    width: 90%;
  }
  @media screen and (min-width: 1025px) {
    width: 816px !important;
  }
  .ant-modal {
    // @media only screen and (min-device-width: 300px) and (max-device-width: 1025px) {
    //   width: 90%;
    // }
    // @media screen and (min-width: 1025px) {
    //   width: 816px !important;
    // }
  }
  .ant-modal-body {
    padding: 0 35px 36px;
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
  .anticon-sync {
    font-size: 28px;
  }
  .ant-modal-footer {
    border-top: none;
    text-align: center;
    width: 50%;
    display: none;
  }
`;

const DivRightWrapper = styled.div`
  flex: 1;
  .ant-btn {
    width: 45%;
    height: 46px;
    color: #333;
  }
  .ant-alert-info {
    border: none;
  }
`;

function DeployContract(props) {
  const {
    isShowDeployContract,
    onHideDeployContract,

    addressList,
    locked,

    code,
    onChangeCode,

    from,
    onChangeFrom,

    gas,
    onChangeGas,

    gasPrice,
    onChangeGasPrice,

    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    isDeployComfirmationLocked,
    onConfirmDeployContract,
    onDeployContract,
    onAbortDeploy,

    deployInProgress,
    deploySuccess,
    deployError,
    intl,
  } = props;

  const DeployCodeProps = { code, onChangeCode, locked };
  const DeployFromProps = { from, addressList, onChangeFrom, locked };
  // const DeployGasProps = { gas, onChangeGas, locked };
  const DeployGasPriceProps = { gasPrice, onChangeGasPrice, locked };

  const DeployConfirmationViewProps = {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onDeployContract,
    onAbortDeploy,
    deployInProgress,
    isDeployComfirmationLocked,
    deployError,
  };
  const DeployProgressProps = { deployInProgress, deployError, deploySuccess };

  // const modalFooter = [
  //   <Button key="reset" type="default" size="large" onClick={onAbortDeploy}>
  //     Reset
  //   </Button>,
  //   <Button key="close" type="default" size="large" onClick={onHideDeployContract}>
  //     Close
  //   </Button>,
  // ];

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <NewModal
        visible={isShowDeployContract}
        title={intl.formatMessage({ ...messages.modalTitle })}
        onOk={onHideDeployContract}
        onCancel={onHideDeployContract}
        // footer={modalFooter}
      >
        <Row gutter={15}>
          <Col xs={24} sm={12}>
            <DeployContractCode {...DeployCodeProps} />
          </Col>
          <Col xs={24} sm={12}>
            <DivRightWrapper style={{ marginLeft: global.isMobile ? '0' : '20px' }}>
              <DeployContractForm {...DeployFromProps} />
              <DeployContractGasPrice {...DeployGasPriceProps} />
              <Button onClick={onConfirmDeployContract} disabled={locked}>
                <FormattedMessage {...messages.btnConfirmInfo} />
              </Button>
              <DeployContractConfirmationView {...DeployConfirmationViewProps} />
            </DivRightWrapper>
          </Col>
        </Row>
        <Row style={{ marginTop: '14px' }}>
          <DeployContractProgress {...DeployProgressProps} />
        </Row>
      </NewModal>
    </div>
  );
}

DeployContract.propTypes = {
  onChangeCode: PropTypes.func.isRequired,
  onChangeFrom: PropTypes.func.isRequired,
  onChangeGas: PropTypes.func.isRequired,
  onChangeGasPrice: PropTypes.func.isRequired,
  onConfirmDeployContract: PropTypes.func.isRequired,
  onDeployContract: PropTypes.func.isRequired,
  onAbortDeploy: PropTypes.func.isRequired,

  code: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  gas: PropTypes.number,
  gasPrice: PropTypes.number,

  locked: PropTypes.bool,

  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isDeployComfirmationLocked: PropTypes.bool,

  deployInProgress: PropTypes.oneOfType([PropTypes.bool]),
  deployError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  deploySuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isShowDeployContract: PropTypes.bool,
  onHideDeployContract: PropTypes.func,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  from: makeSelectFrom(),
  gas: makeSelectGas(),
  addressList: makeSelectAddressList(),
  gasPrice: makeSelectGasPrice(),

  locked: makeSelectLocked(),

  comfirmationLoading: makeSelectComfirmationLoading(),
  confirmationError: makeSelectConfirmationError(),
  confirmationMsg: makeSelectConfirmationMsg(),

  isDeployComfirmationLocked: makeSelectIsDeployComfirmationLocked(),

  deployInProgress: makeSelectDeployInProgress(),
  deployError: makeSelectDeployError(),
  deploySuccess: makeSelectDeploySuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeCode: (code) => {
      dispatch(changeCode(code));
    },
    onChangeFrom: (address) => {
      dispatch(changeFrom(address));
    },
    onChangeGas: (gas) => {
      dispatch(changeGas(gas));
    },
    onChangeGasPrice: (value) => {
      dispatch(changeGasPrice(value));
    },
    onConfirmDeployContract: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmDeployContract());
    },
    onAbortDeploy: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(abortDeploy());
    },
    onDeployContract: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(deployContract());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'deploycontract', reducer });
const withSaga = injectSaga({ key: 'deploycontract', saga });

export default injectIntl(
  compose(
    withReducer,
    withSaga,
    withConnect
  )(DeployContract)
);
