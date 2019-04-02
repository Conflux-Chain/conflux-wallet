/**
 *
 * SendConfirmationView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Spin, Row } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  margin-top: 14px;
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
    intl,
  } = props;
  if (comfirmationLoading) {
    return (
      <Div>
        <Spin
          spinning
          style={{ position: 'static' }}
          size="large"
          tip={intl.formatMessage({ ...messages.checkingTip })}
        >
          <br />
        </Spin>
      </Div>
    );
  }

  if (confirmationError !== false) {
    return (
      <Div>
        <Alert
          message={intl.formatMessage({ ...messages.alertErr1 })}
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
        <Alert
          message={intl.formatMessage({ ...messages.alertErr2 })}
          description={confirmationMsg}
          type="info"
        />
        <br />
        <Row type="flex" justify="space-between">
          <Button icon="to-top" onClick={onDeployContract} disabled={isDeployComfirmationLocked}>
            {deployError ? (
              <FormattedMessage {...messages.btnTryAgain} />
            ) : (
              <FormattedMessage {...messages.btnGoDeploy} />
            )}
          </Button>{' '}
          <Button key="reset" onClick={onAbortDeploy}>
            <FormattedMessage {...messages.btnReset} />
          </Button>
        </Row>
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
  intl: intlShape.isRequired,
};

export default injectIntl(SendConfirmationView);
