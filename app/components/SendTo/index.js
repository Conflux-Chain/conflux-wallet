/**
 *
 * SendTo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 10px;
  .ant-input {
    width: 100%;
    height: 46px;
    line-height: 46px;
    color: #666;
  }
`;

function SendTo({ to, onChangeTo, locked }) {
  return (
    <Div>
      <Input
        placeholder="Send to address"
        value={to}
        onChange={onChangeTo}
        disabled={locked}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </Div>
  );
}

SendTo.propTypes = {
  to: PropTypes.string,
  onChangeTo: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendTo;
