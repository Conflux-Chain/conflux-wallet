import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
interface IProps {
  isLogin: boolean
}
class LockWallet extends Component<IProps> {
  render() {
    const { isLogin } = this.props
    return (
      <>
        {isLogin ? (
          <Button variant="contained" color="primary" className={styles.headerBtn}>
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#iconlock" />
            </svg>
            Unlock Wallet
          </Button>
        ) : null}
      </>
    )
  }
}
export default LockWallet
