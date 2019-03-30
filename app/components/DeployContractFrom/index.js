/**
 *
 * SendFrom
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import styled from 'styled-components';

const Option = Select.Option;

const Div = styled.div`
  .ant-select {
    width: 100% !important;
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

function DeployContractFrom({ addressList, from, onChangeFrom, locked }) {
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
      <TitleDiv>Source</TitleDiv>
      <Select value={from} style={{ width: 300 }} onChange={onChangeFrom} disabled={locked}>
        {selectOptions}
      </Select>
    </Div>
  );
}

DeployContractFrom.propTypes = {
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChangeFrom: PropTypes.func,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    // PropTypes.array,
  ]),
  locked: PropTypes.bool,
};

export default DeployContractFrom;
