import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import QRCode from 'qrcode.react'
interface IProps {
  lockStatus?: boolean
  currentAccountAddress?: string
}
interface IState {
  openDialog?: boolean
}
class Operation extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
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
    const { lockStatus, currentAccountAddress } = this.props
    const { openDialog } = this.state
    return (
      <>
        <Tooltip title="View address in QR code">
          <div className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}>
            <img
              src={Images.code}
              alt=""
              className={styles.icon}
              onClick={() => {
                if (!lockStatus) {
                  this.clickHandle()
                }
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
          <p className={styles.codeString}>{currentAccountAddress}</p>
          <QRCode value={currentAccountAddress} className={styles.codeImg} size={170} />
        </Dialog>
      </>
    )
  }
}
export default Operation
