/**
 *
 * DeployContractCode
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const { TextArea } = Input;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  font-size: 14px;
  color: #333;
`;

function DeployContractCode({ code, onChangeCode, locked }) {
  return (
    <span>
      <TitleDiv>
        <FormattedMessage {...messages.codeTitle} />
      </TitleDiv>
      <TextArea
        style={{
          height: '344px',
        }}
        value={code}
        onChange={(e) => {
          onChangeCode(e.target.value);
        }}
        disabled={locked}
      />
    </span>
  );
}

DeployContractCode.propTypes = {
  code: PropTypes.string,
  onChangeCode: PropTypes.func,
  locked: PropTypes.bool,
};

export default DeployContractCode;
