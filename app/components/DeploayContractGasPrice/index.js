/**
 *
 * DeploayContractGasPrice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Row, Col } from 'antd';

function DeploayContractGasPrice({ gasPrice, onChangeGasPrice, locked }) {
  return (
    <div>
      {'Gas price (Gwei):'}
      <Row type="flex" justify="center">
        <Col span={12}>
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
    </div>
  );
}

DeploayContractGasPrice.propTypes = {
  onChangeGasPrice: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  gasPrice: PropTypes.number,
};

export default DeploayContractGasPrice;
