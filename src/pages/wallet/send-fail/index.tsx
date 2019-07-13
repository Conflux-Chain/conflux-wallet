import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
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
          <svg className={styles.statusIcon}>
            <use xlinkHref="#iconshibai" />
          </svg>
          <p className={styles.tipString}>Sorry，there’s something wrong with your transaction!</p>
        </Dialog>
      </>
    )
  }
}
export default Operation
