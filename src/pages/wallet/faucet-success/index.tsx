import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  openDialog?: boolean
  cfxTx?: string
  onClose?: () => void
}
class Operation extends Component<IProps> {
  static defaultProps = { openDialog: true }

  handleClose() {
    this.props.onClose()
  }
  render() {
    // const { openDialog, I18N, cfxTx } = this.props
    const { openDialog, cfxTx } = this.props
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
          <div className={styles.modalContent}>
            <svg className={styles.statusIcon}>
              <use xlinkHref="#iconchenggong1" />
            </svg>
            <p className={styles.tipString}>Faucet Request Successful!</p>
            <p className={styles.subTipTime}>Check balance in 30 seconds. TX:</p>
            <a
              href="http://confluxscan.io/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.scanLink}
            >
              {cfxTx}
            </a>
            <div className={styles.modalBtnWrap}>
              <Button
                variant="contained"
                color="primary"
                className={styles.btn}
                onClick={() => {
                  this.handleClose()
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    )
  }
}
export default Operation
