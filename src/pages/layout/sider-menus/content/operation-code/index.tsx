import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import QRCode from 'qrcode.react'
interface IState {
  openDialog?: boolean
}
class Operation extends Component<{}, IState> {
  state = {
    openDialog: false,
  }
  clickHandle() {
    this.setState({
      openDialog: true,
    })
  }
  handleClose() {
    this.setState({
      openDialog: false,
    })
  }
  render() {
    const { openDialog } = this.state
    return (
      <>
        <Tooltip title="View address in QR code">
          <div className={styles.operationWrap}>
            <img
              src={Images.code}
              alt=""
              className={styles.icon}
              onClick={() => {
                this.clickHandle()
              }}
            />
          </div>
        </Tooltip>
        <Dialog
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
          <p className={styles.codeString}>0xa70ddf9b9750c575db4 53eea6a041f4c8536785a</p>
          <QRCode
            value="0xa70ddf9b9750c575db4 53eea6a041f4c8536785a"
            className={styles.codeImg}
            size={170}
          />
        </Dialog>
      </>
    )
  }
}
export default Operation
