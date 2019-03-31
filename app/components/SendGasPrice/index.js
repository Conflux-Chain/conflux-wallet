/**
 *
 * SendGasPrice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Row, Col } from 'antd';
// import { Gwei } from 'utils/constants';
// import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  .ant-input-number {
    width: 60px;
    height: 28px;
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

function SendGasPrice({ gasPrice, onChangeGasPrice, locked }) {
  return (
    <Div>
      <TitleDiv>
        <FormattedMessage {...messages.gasPriceTitle} />
      </TitleDiv>
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

SendGasPrice.propTypes = {
  onChangeGasPrice: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  gasPrice: PropTypes.number,
};

export default SendGasPrice;
