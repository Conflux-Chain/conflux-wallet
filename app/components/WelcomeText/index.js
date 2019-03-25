/**
 *
 * WelcomeText
 *
 */

import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 58px;
  color: #fff;
`;

const H2 = styled.h2`
  font-size: 14px;
  margin-top: 16px;
  color: #fff;
`;
const Text = styled.text`
  margin-top: 40px;
`;

function WelcomeText() {
  return (
    <div>
      <H1>Welcome to Conflux Wallet</H1>
      <H2>
        <Text>
          Conflux wallet is a zero client. Connection to Conflux network is made via testnet / local
          node.
        </Text>
        <Text>
          Keystore is encrypted using the password. When the wallet is locked, you can only view
          balances.{' '}
        </Text>
        <Text>All keys are saved inside the browser and never sent.</Text>
      </H2>
    </div>
  );
}

WelcomeText.propTypes = {};

export default WelcomeText;
