import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const TableCon = styled.div`
  background: #f2f2f2;
  padding: 24px 0;
`;
const ItemCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 93%;
  height: 282px;
  margin: 0 auto 24px;
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
  const { data, onShowSendToken, onShowDeployContract } = props;
  let mobileTable = null;

  mobileTable = data.map((item, index) => (
    <ItemCon key={item.key}>
      <Row type="flex" justify="start">
        <TitleSpan>
          <FormattedMessage {...messages.address} />
        </TitleSpan>
        <ContentSpan>{item.address}</ContentSpan>
      </Row>
      <Row type="flex" justify="start" style={{ marginTop: '20px' }}>
        <TitleSpan>
          <FormattedMessage {...messages.balance} />
        </TitleSpan>
        <ContentSpan>{item.balance}</ContentSpan>
      </Row>
      <Row type="flex" justify="start" style={{ marginTop: '20px' }}>
        <TitleSpan>
          <FormattedMessage {...messages.action} />
        </TitleSpan>
        <Button type="primary" ghost onClick={() => onShowSendToken(item.address, item.token)}>
          <FormattedMessage {...messages.send} />
        </Button>
        <Button
          type="primary"
          ghost
          onClick={() => onShowDeployContract()}
          style={{ marginLeft: 10 }}
        >
          <FormattedMessage {...messages.deployContract} />
        </Button>
      </Row>
    </ItemCon>
  ));

  return <TableCon>{mobileTable}</TableCon>;
}

MobileAddressTable.propTypes = {
  data: PropTypes.array,
  onShowSendToken: PropTypes.func,
  onShowDeployContract: PropTypes.func,
};

export default MobileAddressTable;
