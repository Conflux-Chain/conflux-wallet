import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import Hidden from '@material-ui/core/Hidden'
import Snackbar from '@material-ui/core/Snackbar'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import LockWallet from './lock-wallet/index'
// import DeployBtn from './deploy-btn/index'
import RefreshBtn from './refresh-btn/index'
import NetSelect from './net-select/index'
import LangSelect from './lang-select/index'
import MobileMenu from './mobile-menu/index'

type IProps = I18NProps & {
  isLogin: boolean
  lockStatus?: boolean
  lockError?: boolean
  simpleLayout?: boolean
  width?: Breakpoint
  lockAction?: (val) => void
  refreshAction?: (callback, errCallback) => void
}
interface IState {
  openTips?: boolean
  openTipsField?: string
}
class OperateList extends Component<IProps, IState> {
  static defaultProps = { isLogin: false, lockStatus: true }
  state = {
    openTips: false,
    openTipsField: 'tipsSuccess',
  }
  refreshBtnCallback = () => {
    this.setState({
      openTipsField: 'tipsSuccess',
    })
    this.setState({
      openTips: true,
    })
    // TODO: success callback
  }
  refreshBtnErrCallback = () => {
    // TODO: err callback
    this.setState({
      openTipsField: 'tipsFairly',
    })
    this.setState({
      openTips: true,
    })
  }
  render() {
    const { isLogin, lockStatus, lockError, simpleLayout, I18N } = this.props
    const { openTips, openTipsField } = this.state
    const cWidth = this.props.width
    return (
      <>
        {simpleLayout ? (
          <div className={styles.operateWrap}>
            <LangSelect lockStatus={lockStatus} />
          </div>
        ) : (
          <div className={styles.operateWrap}>
            <LockWallet
              isLogin={isLogin}
              lockStatus={lockStatus}
              lockError={lockError}
              lockAction={this.props.lockAction}
            />
            {/* 大屏 */}
            <Hidden xsDown>
              <div className={styles.operateListPc}>
                {/* <DeployBtn isLogin={isLogin}  lockStatus={lockStatus}/> */}
                <RefreshBtn
                  isLogin={isLogin}
                  lockStatus={lockStatus}
                  refreshAction={() => {
                    this.props.refreshAction(this.refreshBtnCallback, this.refreshBtnErrCallback)
                  }}
                />
                <NetSelect lockStatus={lockStatus} />
                <LangSelect lockStatus={lockStatus} />
              </div>
            </Hidden>
            {/* 移动屏 */}
            <Hidden smUp>
              <div className={styles.operateListM}>
                {isLogin ? (
                  <MobileMenu
                    lockStatus={lockStatus}
                    isLogin={isLogin}
                    refreshAction={() => {
                      this.props.refreshAction(this.refreshBtnCallback, this.refreshBtnErrCallback)
                    }}
                  />
                ) : (
                  <NetSelect lockStatus={lockStatus} />
                )}
                <LangSelect lockStatus={lockStatus} />
              </div>
            </Hidden>
            {/* 刷新成功tips */}
            <Snackbar
              className={styles.snackbar}
              anchorOrigin={{
                vertical: isWidthUp('sm', cWidth) ? 'top' : 'bottom',
                horizontal: isWidthUp('sm', cWidth) ? 'right' : 'center',
              }}
              open={openTips}
              autoHideDuration={2000}
              onClose={() => {
                this.setState({
                  openTips: false,
                })
              }}
              message={<span>{I18N.Layout.RefreshBtn[openTipsField]}</span>}
            />
          </div>
        )}
      </>
    )
  }
}
export default I18NHOC(withWidth()(OperateList)) as any
