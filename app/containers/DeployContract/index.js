/**
 *
 * DeployContract
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// eslint-disable-next-line import/no-unresolved
import DeployContractCode from 'components/DeployContractCode';
import DeployContractFrom from 'components/DeployContractFrom';
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
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const DivWrapper = styled.div`
  display: flex;
`;
const DivLeftWrapper = styled.div`
  flex: 1;
`;
const DivRightWrapper = styled.div`
  margin-left: 20px;
  flex: 1;
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

    sendInProgress,
    deployError,
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
    sendInProgress,
    isDeployComfirmationLocked,
    deployError,
  };
  const DeployProgressProps = { sendInProgress, deployError };

  const modalFooter = [
    <Button key="reset" type="default" size="large" onClick={onAbortDeploy}>
      Reset
    </Button>,
    <Button key="close" type="default" size="large" onClick={onHideDeployContract}>
      Close
    </Button>,
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <Modal
        visible={isShowDeployContract}
        title="Deploy Contract"
        onOk={onHideDeployContract}
        onCancel={onHideDeployContract}
        footer={modalFooter}
      >
        <DivWrapper>
          <DivLeftWrapper>
            <DeployContractCode {...DeployCodeProps} /> <br />
          </DivLeftWrapper>
          <DivRightWrapper>
            <DeployContractFrom {...DeployFromProps} /> <br />
            {/* <DeployContractGas {...DeployGasProps} /> */}
            <br /> <br />
            <DeployContractGasPrice {...DeployGasPriceProps} /> <br />
            <Button onClick={onConfirmDeployContract} disabled={locked}>
              Confirm Info
            </Button>
            <br />
            <DeployContractConfirmationView {...DeployConfirmationViewProps} />
            <br />
            <DeployContractProgress {...DeployProgressProps} />
          </DivRightWrapper>
        </DivWrapper>
      </Modal>
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

  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  deployError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isShowDeployContract: PropTypes.bool,
  onHideDeployContract: PropTypes.func,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
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

  sendInProgress: makeSelectDeployInProgress(),
  deployError: makeSelectDeployError(),
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

export default compose(
  withReducer,
  withSaga,
  withConnect
)(DeployContract);
