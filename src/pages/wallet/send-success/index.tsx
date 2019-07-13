import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
interface IProps {
  openDialog?: boolean
  onClose?: () => void
}
class Operation extends Component<IProps> {
  static defaultProps = { openDialog: true }

  handleClose() {
    this.props.onClose()
  }
  render() {
    const { openDialog } = this.props
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
            <p className={styles.tipString}>Your transaction has been sent successfully!</p>
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
          <div className={styles.modalFooter}>
            <p>
              For more details on transaction,
              <strong>
                CLICK HERE
                <svg className={styles.moreIcon} aria-hidden="true">
                  <use xlinkHref="#icongengduo1" />
                </svg>
              </strong>
            </p>
          </div>
        </Dialog>
      </>
    )
  }
}
export default Operation
