import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
import styled from 'styled-components';

const TableCon = styled.div`
  background: #f2f2f2;
  padding-top: 24px;
`;
const ItemCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 93%;
  height: 282px;
  margin: 0 auto;
  padding: 0 20px;
  background: #fff;
  border-radius: 10px;
`;
const TitleSpan = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #3f5057;
  margin-right: 45px;
`;
const ContentSpan = styled.span`
  flex: 1;
  font-size: 15px;
  color: #3f5057;
  word-break: break-all;
  text-align: left;
`;
function MobileAddressTable(props) {
  const { data, onShowSendToken } = props;
  let mobileTable = null;
  mobileTable = data.map((item, index) => (
    <ItemCon key={item.key}>
      <Row type="flex" justify="start">
        <TitleSpan>Address</TitleSpan>
        <ContentSpan>{item.address}</ContentSpan>
      </Row>
      <Row type="flex" justify="start" style={{ marginTop: '20px' }}>
        <TitleSpan>Balance</TitleSpan>
        <ContentSpan>{item.balance}</ContentSpan>
      </Row>
      <Row type="flex" justify="start" style={{ marginTop: '20px' }}>
        <TitleSpan>Action</TitleSpan>
        <Button type="primary" ghost onClick={() => onShowSendToken(item.address, item.token)}>
          Send
        </Button>
      </Row>
    </ItemCon>
  ));
  return <TableCon>{mobileTable}</TableCon>;
}

MobileAddressTable.propTypes = {
  data: PropTypes.array,
  onShowSendToken: PropTypes.func,
};
export default MobileAddressTable;
