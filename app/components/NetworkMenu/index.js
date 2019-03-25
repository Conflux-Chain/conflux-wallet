/**
 *
 * NetworkMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Menu, Button, Dropdown, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
// const MenuDivider = Menu.Divider;

const PCMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    color: #666;
  }
  .ant-dropdown-menu-item-disabled {
    color: rgba(0, 0, 0, 0.25);
  }
  .ant-dropdown-menu-item-selected,
  .ant-dropdown-menu-item-selected > a {
    background-color: #5acfff;
    color: #fff;
  }
`;
const StyledButton = styled(Button)`
  border: none;
  font-size: 14px;
  color: #049cdb;
`;

const StyledMenuItem = styled(MenuItem)`
  line-height: 40px;
`;

function NetworkMenu(props) {
  const { networkName, availableNetworks, onLoadNetwork } = props;

  let options;
  if (availableNetworks) {
    options = availableNetworks.map((network) => (
      <StyledMenuItem key={network}>
        <a tabIndex="0" role="button" onClick={() => onLoadNetwork(network)}>
          {network}
        </a>
      </StyledMenuItem>
    ));
  }

  const menu = (
    <PCMenu forceSubMenuRender defaultSelectedKeys={[networkName]} selectedKeys={[networkName]}>
      <StyledMenuItem disabled key="title">
        Select Conflux network
      </StyledMenuItem>
      {options}
    </PCMenu>
  );

  return (
    <Dropdown overlay={menu}>
      <StyledButton size="large">
        {networkName}
        <Icon type="caret-down" />
      </StyledButton>
    </Dropdown>
  );
}

NetworkMenu.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  networkName: PropTypes.string,
  availableNetworks: PropTypes.object,
};

export default NetworkMenu;
