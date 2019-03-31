/**
 *
 * SendFrom
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Option = Select.Option;

// import styled from 'styled-components';

const Div = styled.div`
  .ant-select {
    width: 100%;
  }
  .ant-select-selection--single {
    height: 46px;
  }
  .ant-select-selection__rendered {
    line-height: 46px;
    font-size: 14px;
    color: #666;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  font-size: 14px;
  color: #333;
`;
function SendFrom({ addressList, from, onChangeFrom, locked }) {
  // let options;
  let selectOptions;
  if (addressList && addressList.keySeq().toArray()) {
    // console.log(addressList.keySeq().toArray());

    /* options = addressList.keySeq().toArray().map((address) =>
      <option value={address} key={address}>{address}</option>
    ); */
    selectOptions = addressList
      .keySeq()
      .toArray()
      .map((address) => (
        <Option value={address} key={address}>
          {address}
        </Option>
      ));
  }

  return (
    <Div>
      <TitleDiv>
        <FormattedMessage {...messages.sourceTitle} />
      </TitleDiv>
      <Select value={from} onChange={onChangeFrom} disabled={locked}>
        {selectOptions}
      </Select>
    </Div>
  );
}

SendFrom.propTypes = {
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChangeFrom: PropTypes.func,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    // PropTypes.array,
  ]),
  locked: PropTypes.bool,
};

export default SendFrom;
