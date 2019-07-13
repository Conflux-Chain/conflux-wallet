import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import React, { Component } from 'react'
import styles from './style.module.scss'
import { namespace } from '@/models/cfx'
import { namespace as namespaceOfCommon } from '@/models/global/common'
import { connect } from 'react-redux'
import TopHeader from './top-header'
import SiderMenus from './sider-menus'
import { RouteComponentProps, withRouter } from 'react-router'
import { IDispatch } from '@/typings'
interface IDvaPropsOfCommon {
  lockStatus: boolean
  simpleLayout?: boolean
}
interface IDvaPropsOfCfx {
  /** 钱包地址 */
  currentAccountAddress: string
}
type IProps = RouteComponentProps &
  Partial<IDvaPropsOfCommon> &
  Partial<IDvaPropsOfCfx> &
  IDispatch & {
    isShowLeftMenu?: boolean
    width?: Breakpoint
  }
interface IState {
  // 侧边导航标志
  mobileOpen?: boolean
}
/**
 * Layout组件
 */
class BasicLayout extends Component<IProps, IState> {
  state: IState = {
    mobileOpen: false,
  }
  onToggleMenus() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    })
  }
  render() {
    const { mobileOpen } = this.state
    const { lockStatus, isShowLeftMenu, simpleLayout } = this.props
    return (
      <div className={styles.root}>
        <TopHeader
          simpleLayout={simpleLayout}
          isLogin={isShowLeftMenu}
          lockStatus={lockStatus}
          onToggleMenus={() => {
            this.onToggleMenus()
          }}
        />
        <SiderMenus
          currentAccountAddress={this.props.currentAccountAddress}
          mobileOpen={mobileOpen}
          isLogin={isShowLeftMenu}
          lockStatus={lockStatus}
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
    ...models[namespace],
    ...models[namespaceOfCommon],
  }
}
export default withRouter(connect(mapStateToProps)(withWidth()(BasicLayout)))
