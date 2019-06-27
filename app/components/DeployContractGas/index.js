/**
 *
 * DeployContractGas
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  margin-bottom: 10px;
  .ant-input-number {
    width: 100%;
    height: 46px;
    margin-left: 0 !important;
  }
  .ant-input-number-input {
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #049cdb;
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

function DeployContractGas({ gas, onChangeGas, locked }) {
  return (
    <Div>
      <TitleDiv>
        <FormattedMessage {...messages.gasLabel} />
      </TitleDiv>
      <InputNumber
        value={gas}
        min={21000}
        step={1}
        onChange={(value) => onChangeGas(value)}
        disabled={locked}
      />
    </Div>
  );
}

DeployContractGas.propTypes = {
  gas: PropTypes.number,
  onChangeGas: PropTypes.func,
  locked: PropTypes.bool,
};

export default DeployContractGas;
