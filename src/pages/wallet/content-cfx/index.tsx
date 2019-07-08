import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
class ContentCfx extends Component {
  render() {
    return (
      <div className={styles.cardContent}>
        <div className={styles.infoBox}>
          <div className={styles.infoBoxTop}>
            <div className={styles.walletHeader}>
              <svg aria-hidden="true" className={styles.walletImg}>
                <use xlinkHref="#iconCFX" />
              </svg>
              <p className={styles.walletName}>CFX</p>
            </div>
            <div className={styles.walletBalance}>
              <p className={styles.walletBalanceTitle}>Total Balance</p>
              <p className={styles.walletBalanceTotal}>12,335.4</p>
            </div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <Button variant="contained" color="primary" className={styles.btn}>
            Send
          </Button>
          <Button variant="outlined" color="primary" className={styles.btn}>
            Receive
          </Button>
        </div>
      </div>
    )
  }
}
export default ContentCfx
