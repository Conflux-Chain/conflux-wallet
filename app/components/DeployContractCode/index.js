/**
 *
 * DeployContracCode
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  font-size: 14px;
  color: #333;
`;

function DeployContracCode({ code, onChangeCode, locked }) {
  return (
    <span>
      <TitleDiv>Contract Bytecode</TitleDiv>
      <Input.TextArea
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

DeployContracCode.propTypes = {
  code: PropTypes.string,
  onChangeCode: PropTypes.func,
  locked: PropTypes.bool,
};

export default DeployContracCode;
