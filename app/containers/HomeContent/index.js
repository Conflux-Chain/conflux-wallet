/**
 *
 * HomeContent
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubHeader from 'components/SubHeader';
import WelcomeText from 'components/WelcomeText';

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  height: 596px;
  background: url('../../images/home_bg.png') no-repeat center top;
`;

function HomeContent(props) {
  const { subHeaderProps } = props;
  return (
    <Div>
      <WelcomeText />
      <SubHeader {...subHeaderProps} />
    </Div>
  );
}

HomeContent.PropTypes = {
  subHeaderProps: PropTypes.object,
};

export default HomeContent;
