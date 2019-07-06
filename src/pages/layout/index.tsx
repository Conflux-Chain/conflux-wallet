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
}
/**
 * Layout组件
 */
class BasicLayout extends Component<IProps, IState> {
  state = {
    isLogin: true,
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

  render() {
    const { isLogin } = this.state
    return (
      <div>
        <TopHeader isLogin={isLogin} />
        <SiderMenus mobileOpen isLogin={isLogin} />
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
