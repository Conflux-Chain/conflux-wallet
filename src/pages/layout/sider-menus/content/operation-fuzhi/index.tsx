import React, { Component } from 'react'
import classnames from 'classnames'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import Tooltip from '@material-ui/core/Tooltip'
import Snackbar from '@material-ui/core/Snackbar'
import copy from 'copy-to-clipboard'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
interface IProps {
  lockStatus?: boolean
  currentAccountAddress?: string
  width?: Breakpoint
}
interface IState {
  openMsg?: boolean
}
class Operation extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    openMsg: false,
  }
  clickHandle() {
    copy(this.props.currentAccountAddress)
    this.setState({
      openMsg: true,
    })
  }
  handleCloseMsg() {
    this.setState({
      openMsg: false,
    })
  }
  render() {
    const { openMsg } = this.state
    const { lockStatus } = this.props
    const cWidth = this.props.width
    return (
      <>
        <Tooltip title="Copy address to clipboard">
          <div
            className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}
            onClick={() => {
              if (!lockStatus) {
                this.clickHandle()
              }
            }}
          >
            <img src={Images.fuzhi} alt="" className={styles.icon} />
          </div>
        </Tooltip>
        <Snackbar
          className={styles.snackbar}
          anchorOrigin={{
            vertical: isWidthUp('sm', cWidth) ? 'top' : 'bottom',
            horizontal: isWidthUp('sm', cWidth) ? 'left' : 'center',
          }}
          open={openMsg}
          autoHideDuration={3000}
          onClose={() => {
            this.handleCloseMsg()
          }}
          message={<span>Address Copied!</span>}
        />
      </>
    )
  }
}
export default withWidth()(Operation)
