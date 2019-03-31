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
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Span = styled.span`
  overflow-wrap: break-word;
`;

function SendProgress({ sendInProgress, sendError, sendTx, txExplorer, intl }) {
  if (sendInProgress) {
    return (
      <Spin
        spinning
        style={{ position: 'static' }}
        size="large"
        tip={intl.formatMessage({ ...messages.sendingTip })}
      >
        <br />
        <br />
      </Spin>
    );
  }

  if (sendError !== false) {
    return (
      <div style={{ marginBottom: 10 }}>
        <Alert
          message={intl.formatMessage({ ...messages.alertErr1 })}
          description={sendError}
          type="error"
        />
      </div>
    );
  }

  if (sendTx) {
    return (
      <div style={{ marginBottom: 10 }}>
        <Alert
          message={intl.formatMessage({ ...messages.sendSuccessTip })}
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
  intl: intlShape.isRequired,
};

export default injectIntl(SendProgress);
