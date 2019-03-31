/**
 *
 * WelcomeText
 *
 */

import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 48px;
  color: #fff;
  text-align: left;
  line-height: 1.1;
`;

const H2 = styled.h2`
  font-size: 14px;
  margin-top: 16px;
  color: #fff;
  max-width: 550px;
  text-align: left;
  line-height: 22px;
`;
const Div = styled.div`
  margin-top: 20px;
`;

function WelcomeText() {
  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <H1>Welcome to Conflux Wallet</H1>
      <H2>
        <Div>
          Conflux wallet is a zero client. Connection to Conflux network is made via local node.
        </Div>
        <Div>
          Keystore is encrypted using the password. When the wallet is locked, you can only view
          balances.
        </Div>
        <Div>All keys are saved inside the browser and never sent.</Div>
      </H2>
    </div>
  );
}

WelcomeText.propTypes = {};

export default WelcomeText;
