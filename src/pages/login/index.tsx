import React, { useState } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import RestoreModal from './components/restore-modal'

const Login = () => {
  const [restoreModal, setRestoreModal] = useState(false)
  const toogleRestore = () => {
    setRestoreModal(!restoreModal)
  }
  return (
    <div className={styles.login}>
      <Container>
        <h2 className={styles.title}>Welcome to Conflux Wallet</h2>
        <div className={styles.conBox}>
          <Paper className={styles.paper} onClick={toogleRestore}>
            <svg className={classnames(styles.nowIcon, styles.icon1)} aria-hidden="true">
              <use xlinkHref="#icon-wenjian" />
            </svg>
            <h5 className={styles.paperTitle}>Restore Wallet</h5>
            <p className={styles.paperDesc}>If you have an account, please restore your wallet</p>
          </Paper>
          <Paper className={styles.paper}>
            <svg className={classnames(styles.nowIcon, styles.icon2)} aria-hidden="true">
              <use xlinkHref="#icon-xinjian" />
            </svg>
            <h5 className={styles.paperTitle}>Create Wallet</h5>
            <p className={styles.paperDesc}>If you have no account, please create wall</p>
          </Paper>
        </div>
      </Container>
      <RestoreModal open={restoreModal} onClose={toogleRestore} />
    </div>
  )
}
export default Login
