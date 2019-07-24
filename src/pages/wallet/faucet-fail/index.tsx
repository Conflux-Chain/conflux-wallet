import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  openDialog?: boolean
  onClose?: () => void
}
class Operation extends Component<IProps> {
  static defaultProps = { openDialog: true }

  handleClose() {
    this.props.onClose()
  }
  render() {
    const { openDialog, I18N } = this.props
    return (
      <>
        <Dialog
          maxWidth="md"
          onClose={() => {
            this.handleClose()
          }}
          className={styles.dialog}
          open={openDialog}
        >
          <MuiDialogTitle>
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
          <svg className={styles.statusIcon}>
            <use xlinkHref="#iconshibai" />
          </svg>
          <p className={styles.tipString}>
            {I18N.Wallet.FaucetModal.fail1} <strong>{I18N.Wallet.FaucetModal.fail2}</strong>{' '}
            {I18N.Wallet.FaucetModal.fail3}
          </p>
        </Dialog>
      </>
    )
  }
}
export default Operation
