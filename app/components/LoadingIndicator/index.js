/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

function LoadingIndicator(props) {
  return (
    <Div>
      <Spin size="large" tip={props.intl.formatMessage({ ...messages.tip })} />
    </Div>
  );
}

LoadingIndicator.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LoadingIndicator);
