import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import QRCode from 'qrcode.react'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  lockStatus?: boolean
  openDialog?: boolean
  currentAccountAddress?: string
  onClose?: () => void
}
class Operation extends Component<IProps> {
  handleClose() {
    this.props.onClose()
  }
  render() {
    const { currentAccountAddress, openDialog } = this.props
    return (
      <>
        <Dialog
          onClose={() => {
            this.handleClose()
          }}
          className={styles.dialog}
          open={openDialog}
        >
          <MuiDialogTitle className={styles.receiveModal}>
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
          <p className={styles.codeString}>{currentAccountAddress}</p>
          <QRCode value={currentAccountAddress} className={styles.codeImg} size={170} />
        </Dialog>
      </>
    )
  }
}
export default Operation
