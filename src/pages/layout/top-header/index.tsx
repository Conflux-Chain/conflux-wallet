import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import OperateList from './operate-list/index'
class TopHeader extends Component {
  render() {
    return (
      <AppBar position="static" className={styles.walletHeaderWrap}>
        <Toolbar className={styles.walletHeader}>
          <img src={Images.logo} alt="" className={styles.headerLogo} />
          <div className={styles.operateWrap}>
            <Button variant="contained" color="primary" className={styles.headerBtn}>
              <img src={Images.lock} alt="" className={styles.icon} />
              Unlock Wallet
            </Button>
            <OperateList />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
export default TopHeader
