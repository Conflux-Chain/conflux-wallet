/**
 *
 * AddressTableFooterErrors
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Div = styled.div`
  max-width: 490px;
  margin: auto;
  margin-top: 35px;
`;
const PaddedAlert = styled(Alert)`
  margin-top: 15px;
`;
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function AddressTableFooterErrors(props) {
  const { checkingBalancesError, addressListError, getExchangeRatesError, intl } = props;
  return (
    <Div>
      {checkingBalancesError ? (
        <Alert
          type="error"
          message={intl.formatMessage({ ...messages.checkingBalancesError })}
          description={checkingBalancesError}
        />
      ) : null}
      {addressListError ? (
        <PaddedAlert
          type="error"
          message={intl.formatMessage({ ...messages.addressListError })}
          description={addressListError}
        />
      ) : null}
      {getExchangeRatesError ? (
        <PaddedAlert
          type="error"
          message={intl.formatMessage({ ...messages.getExchangeRatesError })}
          description={getExchangeRatesError.toString()}
        />
      ) : null}
    </Div>
  );
}

AddressTableFooterErrors.propTypes = {
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(AddressTableFooterErrors);
