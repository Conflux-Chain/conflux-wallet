/**
 *
 * Logo
 *
 */

import React from 'react';
import styled from 'styled-components';
import { website } from 'utils/constants';
// import walletLogo from './conflux_logo.svg';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  height: 56px;
  font-size: 18px;
  line-height: 56px;
`;

const A = styled.a`
  font-size: 32px;
  font-weight: bold;
  color: #049cdb;
`;

function Logo() {
  return (
    <Div>
      <A href={website}>
        <FormattedMessage {...messages.title} />
      </A>
    </Div>
  );
}

Logo.propTypes = {};

export default Logo;
