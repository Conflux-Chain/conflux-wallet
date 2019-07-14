import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  isShow: boolean
  onClose?: () => void
}
class BalanceDetailsModal extends Component<IProps> {
  handleClose() {
    this.props.onClose()
  }
  render() {
    const { isShow, I18N } = this.props
    return (
      <Dialog
        maxWidth="md"
        onClose={() => {
          this.handleClose()
        }}
        className={styles.dialog}
        open={isShow}
      >
        <MuiDialogTitle>
          <div>
            <h1 className={styles.dialogTitle}>{I18N.Wallet.BalanceDetailModal.title}</h1>
          </div>
          <IconButton
            aria-label="Close"
            className={styles.dialogCloseBtn}
            onClick={() => {
              this.handleClose()
            }}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <div className={styles.formContentText}>
          {I18N.Wallet.BalanceDetailModal.contain1}
          <br />
          {I18N.Wallet.BalanceDetailModal.contain2}
          <br />
          {I18N.Wallet.BalanceDetailModal.contain3}
          <br />
          <br />
          {I18N.Wallet.BalanceDetailModal.contain4}
        </div>
      </Dialog>
    )
  }
}
export default BalanceDetailsModal
