/**
 *
 * SendAmount
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

const Div = styled.div`
  font-size: 14px;
  .ant-input-number {
    width: 160px;
    height: 46px;
  }
  .ant-input-number-input {
    height: 44px;
    line-height: 44px;
    color: #666;
  }
`;
const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  color: #333;
`;

function SendAmount({ amount, onChangeAmount, locked }) {
  return (
    <Div>
      <TitleDiv>Amount</TitleDiv>
      <InputNumber
        value={amount}
        min={0}
        step={0.1}
        size="large"
        onChange={(value) => onChangeAmount(value)}
        disabled={locked}
      />
    </Div>
  );
}

SendAmount.propTypes = {
  amount: PropTypes.number,
  onChangeAmount: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendAmount;
