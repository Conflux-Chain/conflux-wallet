/**
 *
 * Logo
 *
 */

import React from 'react';
import styled from 'styled-components';
import { website } from 'utils/constants';
import walletLogo from './conflux_logo.svg';

const Div = styled.div`
  height: 80px;
  font-size: 18px;
  line-height: 80px;
`;

const Img = styled.img`
  height: 70px;
  width: 70px;
  line-height: 80px;
  margin-right: 5px;
`;

function Logo() {
  return (
    <Div>
      <Img alt="logo" src={walletLogo} />
      <a href={website}>Conflux Wallet</a>
    </Div>
  );
}

Logo.propTypes = {};

export default Logo;
