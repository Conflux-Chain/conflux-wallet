/**
 *
 * DeployContractGasPrice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider, InputNumber, Row, Col } from 'antd';

const Div = styled.div`
  .ant-input-number {
    width: 60px;
    height: 28px;
    margin-left: 0 !important;
  }
  .ant-input-number-input {
    height: 26px;
    line-height: 26px;
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

function DeployContractGasPrice({ gasPrice, onChangeGasPrice, locked }) {
  return (
    <Div>
      <TitleDiv>Gas price</TitleDiv>
      <Row type="flex" justify="space-between">
        <Col span={18}>
          <Slider
            min={0.5}
            max={100}
            step={0.1}
            onChange={onChangeGasPrice} // Bignumber created by reducer
            value={gasPrice}
            disabled={locked}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0.5}
            max={100}
            step={0.1}
            style={{ marginLeft: 16 }}
            value={gasPrice}
            onChange={onChangeGasPrice} // Bignumber created by reducer
            disabled={locked}
          />
        </Col>
      </Row>
    </Div>
  );
}

DeployContractGasPrice.propTypes = {
  onChangeGasPrice: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  gasPrice: PropTypes.number,
};

export default DeployContractGasPrice;
