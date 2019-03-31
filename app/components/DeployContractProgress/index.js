/**
 *
 * DeployContractProgress
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

// TODO:部署成功后的回调数据如何展示或者交互？

function DeployContractProgress({ deployInProgress, deployError, deploySuccess, intl }) {
  if (deployInProgress) {
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
  if (deployError) {
    return (
      <Alert
        message={intl.formatMessage({ ...messages.alertErr1 })}
        description={deployError}
        type="error"
      />
    );
  }

  if (deploySuccess) {
    return (
      <Alert
        message={intl.formatMessage({ ...messages.alertSuccess })}
        description={
          <Span>
            {' '}
            <FormattedMessage {...messages.labelTxHash} />
            : <br /> <TxLink tx={deploySuccess} />{' '}
          </Span>
        }
        type="success"
      />
    );
  }

  return null;
}

DeployContractProgress.propTypes = {
  deployInProgress: PropTypes.oneOfType([PropTypes.bool]),
  deployError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  deploySuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default injectIntl(DeployContractProgress);
