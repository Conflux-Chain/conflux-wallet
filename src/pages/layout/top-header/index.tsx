import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import OperateList from './operate-list/index'

interface IProps {
  isLogin: boolean
}
class TopHeader extends Component<IProps> {
  render() {
    const { isLogin } = this.props
    return (
      <AppBar position="static" className={styles.walletHeaderWrap}>
        <Toolbar className={styles.walletHeader}>
          <img src={Images.logo} alt="" className={styles.headerLogo} />
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
export default TopHeader
