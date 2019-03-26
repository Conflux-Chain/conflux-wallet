/**
 *
 * PageFooter
 *
 */

import React from 'react';
// import { github } from 'utils/constants';
import styled from 'styled-components';

import { StickyFooter } from './sticky';

const Footer = StickyFooter.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 14px;
`;
// const Text1 = styled.text`
//   margin-right: 30px;
// `;
const A = styled.a`
  color: #0075b9;
`;

function PageFooter() {
  return (
    <Footer>
      {/* <Text1>Conflux Hot Wallet&nbsp;<A>(Github)</A></Text1> */}
      <text>
        Conflux Offical Website&nbsp;
        <A href="http://www.conflux-chain.org">http://www.conflux-chain.org</A>
      </text>
    </Footer>
  );
}

PageFooter.propTypes = {};

export default PageFooter;
