/**
 *
 * DeployContracCode
 *
 */

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';
function DeployContracCode({ code, onChangeCode, locked }) {
  return (
    <span>
      {'Code '}
      <Input.TextArea
        style={{
          height: '100%',
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

DeployContracCode.propTypes = {
  code: PropTypes.string,
  onChangeCode: PropTypes.func,
  locked: PropTypes.bool,
};

export default DeployContracCode;
