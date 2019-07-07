import React from 'react'
import { styled } from '@material-ui/styles'
import styles from './style.module.scss'
import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import upLoadImg from '../../images/xinjian.svg'

const Mycontainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const RestoreModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} className={styles.restoreModal}>
      <Mycontainer>
        <div className={styles.container1}>
          <div className={styles.dotBox}>
            <div className={styles.dotItemAc} />
            <div className={styles.dotItem} />
          </div>
          <div className={styles.uploadBox}>
            <img alt="upload" src={upLoadImg} className={styles.uploadIc} />
          </div>
          <p className={styles.tips}>Hello, you should upload keystore file firstly.</p>
          <Button variant="contained" className={styles.button}>
            Continue
          </Button>
        </div>
        <div className={styles.bottomInfo}>
          <p className={styles.words}>
            If you have no account, please<span className={styles.linkName}>Create Wallet</span>>>
          </p>
          <div className={styles.errorBox}>
            <p className={styles.errorInfo}>JSON Parse error: “Unrecognize token”</p>
          </div>
        </div>
      </Mycontainer>
    </Modal>
  )
}
export default RestoreModal
