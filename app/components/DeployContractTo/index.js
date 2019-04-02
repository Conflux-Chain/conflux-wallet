/**
 *
 * DeployContractTo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  margin-top: 10px;
  .ant-input {
    width: 100%;
    height: 46px;
    line-height: 46px;
    color: #666;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  font-size: 14px;
  color: #333;
`;

function DeployContractTo({ to, onChangeTo, locked, intl }) {
  return (
    <Div>
      <TitleDiv>
        <FormattedMessage {...messages.sourceTitle} />
      </TitleDiv>
      <Input
        placeholder={intl.formatMessage({ ...messages.placeholderDeployContractTo })}
        value={to}
        onChange={onChangeTo}
        disabled={locked}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </Div>
  );
}

DeployContractTo.propTypes = {
  to: PropTypes.string,
  onChangeTo: PropTypes.func,
  locked: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(DeployContractTo);
