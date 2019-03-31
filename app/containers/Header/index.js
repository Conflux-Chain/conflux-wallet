/**
 *
 * Header
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Row, Col } from 'antd';

import NetworkIndicator from 'components/NetworkIndicator';
import Logo from 'components/Logo';
import NetworkMenu from 'components/NetworkMenu';
import LocaleToggle from 'containers/LocaleToggle';

// import { changeBalance } from 'containers/HomePage/actions';

import {
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
  makeSelectBlockNumber,
  makeSelectAvailableNetworks,
  /* makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError, */
  makeSelectCheckFaucetLoading,
  makeSelectCheckFaucetSuccess,
  makeSelectAskFaucetLoading,
  makeSelectAskFaucetSuccess,
  makeSelectAskFaucetError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadNetwork } from './actions';

const HeaderWrapped = styled.header`
  transition: opacity 0.5s;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  font-size: 16px;
  border-bottom: 1px solid #f5f5f5;
`;

function Header(props) {
  const { loading, error, networkName, blockNumber, availableNetworks, onLoadNetwork } = props;

  const networkIndicatorProps = {
    loading,
    error,
    blockNumber,
  };

  const networkMenuProps = {
    availableNetworks,
    networkName,
    onLoadNetwork,
  };

  return (
    <HeaderWrapped className="clearfix">
      <Row type="flex" align="middle" justify="space-around" style={{ backgroundColor: '#fff' }}>
        <Col span={6} style={{ textAlign: 'left', paddingLeft: 20 }}>
          <Logo />
        </Col>
        <Col span={18}>
          <Row type="flex" align="middle" justify="end" style={{ paddingRight: 20 }}>
            <NetworkIndicator {...networkIndicatorProps} />
            <NetworkMenu {...networkMenuProps} />
            <LocaleToggle />
          </Row>
        </Col>
      </Row>
    </HeaderWrapped>
  );
}

Header.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  // onCheckBalances: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  networkName: PropTypes.string,
  availableNetworks: PropTypes.object,
  blockNumber: PropTypes.number,

  /* checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]), */
};

const mapStateToProps = createStructuredSelector({
  networkReady: makeSelectNetworkReady(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  networkName: makeSelectNetworkName(),
  availableNetworks: makeSelectAvailableNetworks(),
  blockNumber: makeSelectBlockNumber(),
  /* checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(), */
  checkFaucetLoading: makeSelectCheckFaucetLoading(),
  checkFaucetSuccess: makeSelectCheckFaucetSuccess(),
  askFaucetLoading: makeSelectAskFaucetLoading(),
  askFaucetSuccess: makeSelectAskFaucetSuccess(),
  askFaucetError: makeSelectAskFaucetError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadNetwork: (name) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork(name));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Header);
