/**
 *
 * NetworkLabel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

function NetworkLabel(props) {
  const { loading, error, networkName, blockNumber } = props;
  if (loading) {
    return (
      <div>
        <FormattedMessage {...messages.loadingTitle} />
      </div>
    );
  }

  if (error !== false) {
    return <div> {error} </div>;
  }

  const networkNameStr = networkName.replace(/_/g, ' ');
  if (networkName !== '') {
    return (
      <div>
        <FormattedMessage {...messages.networkName} />
        {networkNameStr}
        <br />
        <FormattedMessage {...messages.blockNumber} />
        {blockNumber}
      </div>
    );
  }

  return null;
}

NetworkLabel.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  networkName: PropTypes.string,
  blockNumber: PropTypes.number,
};

export default NetworkLabel;
