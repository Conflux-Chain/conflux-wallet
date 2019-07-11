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
  onToggleMenus?: () => void
  width?: Breakpoint
}
class TopHeader extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  onToggleMenus() {
    this.props.onToggleMenus()
  }
  render() {
    const { isLogin, lockStatus } = this.props
    return (
      <AppBar position="fixed" className={styles.walletHeaderWrap}>
        <Toolbar
          className={isWidthUp('sm', this.props.width) ? styles.walletHeader : styles.walletHeaderM}
        >
          {/* 左边logo与菜单按钮 */}
          <LogoBox
            isLogin={isLogin}
            onToggleMenus={() => {
              this.onToggleMenus()
            }}
          />
          {/* 右边操作项 */}
          <OperateList isLogin={isLogin} lockStatus={lockStatus} />
        </Toolbar>
      </AppBar>
    )
  }
}
export default withWidth()(TopHeader)
