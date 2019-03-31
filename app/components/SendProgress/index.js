/**
 *
 * SendProgress
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';
import styled from 'styled-components';
import TxLink from 'components/TxLink';

const Span = styled.span`
  overflow-wrap: break-word;
`;

function SendProgress({ sendInProgress, sendError, sendTx, txExplorer }) {
  if (sendInProgress) {
    return (
      <Spin spinning style={{ position: 'static' }} size="large" tip="Sending...">
        <br />
        <br />
      </Spin>
    );
  }

  if (sendError !== false) {
    return (
      <div style={{ marginBottom: 10 }}>
        <Alert message="Send Error" description={sendError} type="error" />
      </div>
    );
  }

  if (sendTx) {
    return (
      <div style={{ marginBottom: 10 }}>
        <Alert
          message="Send sucessfull"
          description={
            <Span>
              {' '}
              TX: <br /> <TxLink tx={sendTx} explorer={txExplorer} />{' '}
            </Span>
          }
          type="success"
        />
      </div>
    );
  }

  return null;
}

SendProgress.propTypes = {
  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  txExplorer: PropTypes.string,
};

export default SendProgress;
