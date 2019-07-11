import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
interface IProps {
  isShow: boolean
  onClose?: () => void
}
class BalanceDetailsModal extends Component<IProps> {
  handleClose() {
    this.props.onClose()
  }
  render() {
    const { isShow } = this.props
    return (
      <Dialog
        onClose={() => {
          this.handleClose()
        }}
        className={styles.dialog}
        open={isShow}
      >
        <MuiDialogTitle>
          <div>
            <h1 className={styles.dialogTitle}>About Balance</h1>
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
        <div className={styles.formContentText}>为了倡导社区成员通过参与Conflux社</div>
      </Dialog>
    )
  }
}
export default BalanceDetailsModal
