import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import OperateList from './operate-list/index'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
interface IProps {
  isLogin: boolean
  onToggleMenus?: () => void
  width?: Breakpoint
}
class TopHeader extends Component<IProps> {
  onToggleMenus() {
    this.props.onToggleMenus()
  }
  render() {
    const { isLogin } = this.props
    return (
      <AppBar position="fixed" className={styles.walletHeaderWrap}>
        <Toolbar
          className={isWidthUp('sm', this.props.width) ? styles.walletHeader : styles.walletHeaderM}
        >
          {isLogin ? (
            <React.Fragment>
              <Hidden smUp implementation="css">
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  edge="start"
                  onClick={() => {
                    this.onToggleMenus()
                  }}
                >
                  <MenuIcon color="inherit" />
                </IconButton>
              </Hidden>
              <Hidden xsDown>
                <svg className={styles.headerLogo} aria-hidden="true">
                  <use xlinkHref="#iconlogo_hengban" />
                </svg>
              </Hidden>
            </React.Fragment>
          ) : (
            <svg className={styles.headerLogo} aria-hidden="true">
              <use xlinkHref="#iconlogo_hengban" />
            </svg>
          )}

          <div className={styles.operateWrap}>
            {isLogin ? (
              <Button variant="contained" color="primary" className={styles.headerBtn}>
                <img src={Images.lock} alt="" className={styles.icon} />
                Unlock Wallet
              </Button>
            ) : null}
            <OperateList isLogin={isLogin} />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
export default withWidth()(TopHeader)
