import React, { Component } from 'react'
import { namespace as globalMenuNamespace } from '@/models/global/menu'
import { connect } from 'react-redux'
import TopHeader from './top-header'
import SiderMenus from './sider-menus'
import { RouteComponentProps, withRouter } from 'react-router'
type IProps = RouteComponentProps & {
  selectedKeys?: any[]
  openKeys?: any[]
  dispatch?: any
}
interface IState {
  // 临时作为登录标准
  isLogin?: boolean
  // 侧边导航标志
  mobileOpen?: boolean
}
/**
 * Layout组件
 */
class BasicLayout extends Component<IProps, IState> {
  state = {
    isLogin: true,
    mobileOpen: false,
  }
  onSelect = ({ selectedKeys }) => {
    this.props.dispatch({
      type: `${globalMenuNamespace}/setState`,
      payload: {
        selectedKeys,
      },
    })
  }
  onOpenChange = ({ openKeys }) => {
    this.props.dispatch({
      type: `${globalMenuNamespace}/setState`,
      payload: {
        openKeys,
      },
    })
  }
  onToggleMenus() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    })
  }
  render() {
    const { isLogin, mobileOpen } = this.state
    return (
      <div>
        <TopHeader
          isLogin={isLogin}
          onToggleMenus={() => {
            this.onToggleMenus()
          }}
        />
        <SiderMenus
          mobileOpen={mobileOpen}
          isLogin={isLogin}
          onToggleMenus={() => {
            this.onToggleMenus()
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = models => {
  return {
    ...models[globalMenuNamespace],
  }
}
export default withRouter(connect(mapStateToProps)(BasicLayout))
