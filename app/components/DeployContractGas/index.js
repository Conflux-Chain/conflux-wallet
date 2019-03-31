/**
 *
 * DeployContractGas
 *
 */

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

function DeployContractGas({ gas, onChangeGas, locked }) {
  return (
    <span>
      <FormattedMessage {...messages.gasLabel} />
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

DeployContractGas.propTypes = {
  gas: PropTypes.number,
  onChangeGas: PropTypes.func,
  locked: PropTypes.bool,
};

export default DeployContractGas;
