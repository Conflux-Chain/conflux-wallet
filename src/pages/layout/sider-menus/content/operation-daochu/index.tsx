import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  lockStatus?: boolean
  currentAccountPrivateKey?: string
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
    const { lockStatus, currentAccountPrivateKey: currentAccountAddress, I18N } = this.props
    const { openDialog } = this.state
    return (
      <>
        <Tooltip title={I18N.Layout.OperationDaochu.extractPrivateKey}>
          <div className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}>
            <img
              src={Images.daochu}
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
            <div className={styles.dialogTitle}>{I18N.Layout.OperationDaochu.privateKey}</div>
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
          <div className={styles.warnFooter}>
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#iconzhuyi" />
            </svg>
            <p>{I18N.Layout.OperationDaochu.tips}</p>
          </div>
        </Dialog>
      </>
    )
  }
}
export default Operation
