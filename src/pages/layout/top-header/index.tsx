import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
// import { isMobile } from '@/utils/tools/style/index'
import Button from '@material-ui/core/Button'

import Hidden from '@material-ui/core/Hidden'
class TopHeader extends Component {
  render() {
    return (
      <div className={styles.walletHeader}>
        <img src={Images.logo} alt="" className={styles.headerLogo} />
        <div className={styles.operateWrap}>
          <Button variant="contained" color="primary" className={styles.headerBtn}>
            <img src={Images.lock} alt="" className={styles.icon} />
            Unlock Wallet
          </Button>
          <Hidden xsDown>xsDown</Hidden>
          <Hidden smUp>smUp</Hidden>
        </div>
      </div>
    )
  }
}
export default TopHeader
