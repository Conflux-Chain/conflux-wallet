import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import { I18NProps } from '@/i18n/context'
import ReceiveCodeModal from '@/components/receive-code-modal/index'
interface IProps extends Partial<I18NProps> {
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
    const { lockStatus, currentAccountAddress, I18N } = this.props
    const { openDialog } = this.state
    return (
      <>
        <Tooltip title={I18N.Layout.OperationCode.viewCode}>
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
        <ReceiveCodeModal
          currentAccountAddress={currentAccountAddress}
          openDialog={openDialog}
          onClose={() => {
            this.handleClose()
          }}
        />
      </>
    )
  }
}
export default Operation
