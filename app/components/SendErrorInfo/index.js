/**
 *
 * SendTo
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Row, Icon } from 'antd';
import styled from 'styled-components';

const Div = styled.div`
  margin: 10px auto;
  .anticon-close-circle {
    color: #fd4141;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
const Text = styled.text`
  font-size: 14px;
  color: #fd4141;
`;

function SendErrorInfo() {
  return (
    <Div>
      <Row type="flex" justify="center" align="middle">
        <Icon type="close-circle" />
        <Text>Amount error</Text>
      </Row>
    </Div>
  );
}

SendErrorInfo.propTypes = {};

export default SendErrorInfo;
