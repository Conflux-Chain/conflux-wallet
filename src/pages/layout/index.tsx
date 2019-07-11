import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import React, { Component } from 'react'
import styles from './style.module.scss'
import { namespace as globalCommonNamespace } from '@/models/global/common'
import { connect } from 'react-redux'
import TopHeader from './top-header'
import SiderMenus from './sider-menus'
import { RouteComponentProps, withRouter } from 'react-router'
type IProps = RouteComponentProps & {
  lockStatus?: boolean
  dispatch?: any
  width?: Breakpoint
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
  onToggleMenus() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    })
  }
  render() {
    const { isLogin, mobileOpen } = this.state
    const { lockStatus } = this.props

    return (
      <div className={styles.root}>
        <TopHeader
          isLogin={isLogin}
          lockStatus={lockStatus}
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
        <main className={isWidthUp('sm', this.props.width) ? styles.content : styles.contentM}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = models => {
  return {
    ...models[globalCommonNamespace],
  }
}
export default withRouter(connect(mapStateToProps)(withWidth()(BasicLayout)))
