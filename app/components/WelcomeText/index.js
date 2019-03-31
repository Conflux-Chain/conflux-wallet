/**
 *
 * WelcomeText
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedHTMLMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

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

function WelcomeText() {
  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <H1>
        <FormattedMessage {...messages.welcomeTitle} />
      </H1>
      <H2>
        <FormattedHTMLMessage {...messages.welcomeDes} />
      </H2>
    </div>
  );
}

WelcomeText.propTypes = {};

export default WelcomeText;
