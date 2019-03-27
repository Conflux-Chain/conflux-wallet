/**
 *
 * SendConfirmationView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Spin } from 'antd';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 22px;
`;

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function SendConfirmationView(props) {
  const {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onDeployContract,
    onAbortDeploy,
    isDeployComfirmationLocked,
    deployError,
  } = props;
  if (comfirmationLoading) {
    return (
      <Div>
        <Spin spinning style={{ position: 'static' }} size="large" tip="checking transaction....">
          <br />
        </Spin>
      </Div>
    );
  }

  if (confirmationError !== false) {
    return (
      <Div>
        <Alert
          message="Transaction not created"
          description={confirmationError}
          type="error"
          showIcon
        />
      </Div>
    );
  }

  if (confirmationMsg !== false) {
    return (
      <Div>
        <Alert message="Deploy info is valid" description={confirmationMsg} type="info" />
        <br />
        <Button icon="to-top" onClick={onDeployContract} disabled={isDeployComfirmationLocked}>
          {deployError ? 'Try again' : 'Go Deploy'}
        </Button>{' '}
        <Button icon="close" onClick={onAbortDeploy} disabled={isDeployComfirmationLocked}>
          Back
        </Button>
      </Div>
    );
  }

  return null;
}

SendConfirmationView.propTypes = {
  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isDeployComfirmationLocked: PropTypes.bool,

  onDeployContract: PropTypes.func.isRequired,
  onAbortDeploy: PropTypes.func.isRequired,

  deployError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SendConfirmationView;
