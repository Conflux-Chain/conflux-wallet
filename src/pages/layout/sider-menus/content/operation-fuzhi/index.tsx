import React, { Component } from 'react'
import classnames from 'classnames'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import Tooltip from '@material-ui/core/Tooltip'
import Snackbar from '@material-ui/core/Snackbar'
import copy from 'copy-to-clipboard'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
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
    const { lockStatus, I18N } = this.props
    const cWidth = this.props.width
    return (
      <>
        <Tooltip title={I18N.Layout.OperationFuzhi.text}>
          <div
            className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}
            onClick={() => {
              if (!lockStatus) {
                this.clickHandle()
              }
            }}
          >
            <svg
              className={styles.icon}
              aria-hidden="true"
              onClick={() => {
                if (!lockStatus) {
                  this.clickHandle()
                }
              }}
            >
              <use xlinkHref="#iconfuzhi-" />
            </svg>
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
          message={<span>{I18N.Layout.OperationFuzhi.copied}</span>}
        />
      </>
    )
  }
}
export default withWidth()(Operation)
