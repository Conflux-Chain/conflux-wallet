/**
 *
 * HomeContent
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import RestoreWalletModal from 'components/RestoreWalletModal';
import SubHeader from 'components/SubHeader';
import WelcomeText from 'components/WelcomeText';
import * as bgImg from '../../images/imgs/home_bg.png';

const Div = styled.div`
  @media only screen and (min-device-width: 300px) and (max-device-width: 768px) {
    min-height: 596px;
  }
  @media screen and (min-width: 768px) {
    height: 596px;
  }
  width: 100%;
  padding-top: 10px;
  background: url(${bgImg}) no-repeat center top;
  background-size: cover;
`;
const RestoreCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-device-width: 300px) and (max-device-width: 1025px) {
    width: 90%;
    margin: 20px auto;
    padding: 0 20px;
  }
  @media screen and (min-width: 1025px) {
    width: 426px;
    padding: 0 36px;
  }
  height: 360px;
  background: #fff;
  border-radius: 10px;
`;

function HomeContent(props) {
  const { subHeaderProps, restoreWalletModalProps } = props;
  return (
    <Div>
      <Row type="flex" align="middle" style={{ height: '100%' }}>
        <Col md={{ span: 14 }} sm={24} xs={24}>
          <Row type="flex" justify="center">
            <WelcomeText />
          </Row>
        </Col>
        <Col md={{ span: 10 }} sm={24} xs={24}>
          <Row type="flex" align="middle" justify="start">
            <RestoreCon>
              <RestoreWalletModal {...restoreWalletModalProps} />
              <SubHeader {...subHeaderProps} />
            </RestoreCon>
          </Row>
        </Col>
      </Row>
    </Div>
  );
}

HomeContent.PropTypes = {
  subHeaderProps: PropTypes.object,
};

export default HomeContent;
