import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import OperateList from './operate-list/index'
import LogoBox from './logo-box/index'
interface IProps {
  isLogin: boolean
  lockStatus?: boolean
  lockError?: boolean
  simpleLayout?: boolean
  width?: Breakpoint
  lockAction?: (val) => void
  onToggleMenus?: () => void
}
class TopHeader extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  onToggleMenus() {
    this.props.onToggleMenus()
  }
  render() {
    const { isLogin, lockStatus, simpleLayout, lockError } = this.props

    return (
      <AppBar position="fixed" className={styles.walletHeaderWrap}>
        <Toolbar
          className={isWidthUp('sm', this.props.width) ? styles.walletHeader : styles.walletHeaderM}
        >
          {/* 左边logo与菜单按钮 */}
          <LogoBox
            isLogin={isLogin}
            simpleLayout={simpleLayout}
            onToggleMenus={() => {
              this.onToggleMenus()
            }}
          />
          {/* 右边操作项 */}
          {simpleLayout ? null : (
            <OperateList
              isLogin={isLogin}
              lockStatus={lockStatus}
              lockError={lockError}
              lockAction={this.props.lockAction}
            />
          )}
        </Toolbar>
      </AppBar>
    )
  }
}
export default withWidth()(TopHeader)
