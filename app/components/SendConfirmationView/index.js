/**
 *
 * SendConfirmationView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Spin } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

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
    onSendTransaction,
    onAbortTransaction,
    isSendComfirmationLocked,
    sendError,
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
        <Button
          type="primary"
          icon="to-top"
          onClick={onSendTransaction}
          disabled={isSendComfirmationLocked}
        >
          {sendError ? (
            <FormattedMessage {...messages.btnTryAgain} />
          ) : (
            <FormattedMessage {...messages.btnSendCfx} />
          )}
        </Button>
        <br />
        <Button key="reset" type="primary" onClick={onAbortTransaction} style={{ marginTop: 10 }}>
          <FormattedMessage {...messages.btnReset} />
        </Button>
        {/* <br /> */}
        {/* <Button */}
        {/* type="primary" */}
        {/* icon="close" */}
        {/* onClick={onAbortTransaction} */}
        {/* disabled={isSendComfirmationLocked} */}
        {/* style={{ marginTop: 10 }} */}
        {/* > */}
        {/* Back */}
        {/* </Button> */}
      </Div>
    );
  }

  return null;
}

SendConfirmationView.propTypes = {
  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isSendComfirmationLocked: PropTypes.bool,

  onSendTransaction: PropTypes.func.isRequired,
  onAbortTransaction: PropTypes.func.isRequired,

  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(SendConfirmationView);
