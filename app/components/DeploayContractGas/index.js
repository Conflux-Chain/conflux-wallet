/**
 *
 * DeploayContractGas
 *
 */

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

function DeploayContractGas({ gas, onChangeGas, locked }) {
  return (
    <span>
      {'Gas: '}
      <InputNumber
        value={gas}
        min={0}
        step={0.1}
        onChange={(value) => onChangeGas(value)}
        disabled={locked}
      />
    </span>
  );
}

DeploayContractGas.propTypes = {
  gas: PropTypes.number,
  onChangeGas: PropTypes.func,
  locked: PropTypes.bool,
};

export default DeploayContractGas;
