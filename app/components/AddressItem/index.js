/**
 *
 * AddressItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Ether, tokenName } from 'utils/constants';
import messages from './messages';

function AddressItem(props) {
  const { address, data, onChangeFrom, exchangeRates, convertTo } = props;
  const ethData = data.get('eth');

  const balance =
    ethData.get('balance') !== false
      ? `${ethData
          .get('balance')
          .div(Ether)
          .toString(10)} ${tokenName} `
      : 'n/a';

  const rate = exchangeRates.getIn([convertTo, 'rate']);
  const convertedBalance =
    balance !== 'n/a' && rate
      ? ethData
          .get('balance')
          .div(Ether)
          .times(rate)
          .toFixed(2)
          .toString(10)
      : '';
  const convertToName = exchangeRates.getIn([convertTo, 'name']);

  return (
    <div>
      {address} | <FormattedMessage {...messages.balance} />: {balance}
      {convertedBalance} {convertToName}
      <button onClick={() => onChangeFrom(address)}>
        <FormattedMessage {...messages.send} />
      </button>
    </div>
  );
}

AddressItem.propTypes = {
  address: PropTypes.string,
  data: PropTypes.object,
  onChangeFrom: PropTypes.func,
  exchangeRates: PropTypes.object,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default AddressItem;
