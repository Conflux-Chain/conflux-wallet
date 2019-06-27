/**
 *
 * FaucetDescription
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TxLink from 'components/TxLink';

const Span = styled.span`
  overflow-wrap: break-word;
`;

function FaucetDescription(props) {
  const { tx, text } = props;

  const explorer = 'http://confluxscan.io/transactionsdetail/';
  const TxLinkProps = { tx, explorer };

  return (
    <Span>
      {text}
      <br />
      <TxLink {...TxLinkProps} />
    </Span>
  );
}

FaucetDescription.propTypes = {
  tx: PropTypes.string,
  text: PropTypes.string,
};

export default FaucetDescription;
