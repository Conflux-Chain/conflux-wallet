import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
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
            <svg
              className={styles.icon}
              aria-hidden="true"
              onClick={() => {
                if (!lockStatus) {
                  this.clickHandle()
                }
              }}
            >
              <use xlinkHref="#iconerweima-xiao" />
            </svg>
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
