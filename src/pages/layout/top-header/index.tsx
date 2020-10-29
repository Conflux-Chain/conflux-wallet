import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import OperateList from './operate-list/index'
import LogoBox from './logo-box/index'
import { I18NProps } from '@/i18n/context'
import { I18NHOC } from '@/utils/tools/react'
import { LangEnum } from '../../../i18n/typing'
type IProps = I18NProps & {
  isLogin: boolean
  lockStatus?: boolean
  lockError?: boolean
  simpleLayout?: boolean
  width?: Breakpoint
  lockAction?: (val) => void
  onToggleMenus?: () => void
  refreshAction?: (callback, errCallback) => void
}

interface IState {
  // 侧边导航标志
  alertOpen?: boolean
}
class TopHeader extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  state: IState = {
    alertOpen: true,
  }
  onToggleMenus() {
    this.props.onToggleMenus()
  }
  render() {
    const { isLogin, lockStatus, simpleLayout, lockError, I18N } = this.props
    const { alertOpen } = this.state
    const helpUrl =
      I18N.currentLang === LangEnum.zh_CN
        ? 'https://juejin.im/post/5e9d8133e51d4546b90d2ee9'
        : 'https://medium.com/@ConfluxNetwork/confluxportal-installation-and-user-manual-9f50de62fee0?sk=8906d87fc102bb6d2688b1ee287ab458'

    return (
      <AppBar position="fixed" className={styles.walletHeaderWrap}>
        {alertOpen && (
          <div className={isWidthUp('sm', this.props.width) ? styles.alert : styles.alertM}>
            <div>{I18N.Layout.LockWallet.alertMsg1}</div>
            <div>
              {I18N.Layout.LockWallet.alertMsg2}
              <a href={helpUrl} target="_blank" rel="noopener noreferrer">
                {I18N.Layout.LockWallet.alertMsg3}
              </a>
              {I18N.Layout.LockWallet.alertMsgEnd}
              <CloseIcon
                onClick={() => {
                  this.setState({ alertOpen: false })
                }}
                style={
                  isWidthUp('sm', this.props.width)
                    ? {
                        color: '#e06363',
                        position: 'absolute',
                        top: '12px',
                        right: '24px',
                        cursor: 'pointer',
                      }
                    : {
                        color: '#e06363',
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        cursor: 'pointer',
                      }
                }
              />
            </div>
          </div>
        )}
        <Toolbar
          className={isWidthUp('sm', this.props.width) ? styles.walletHeader : styles.walletHeaderM}
        >
          {/* 左边logo与菜单按钮 */}
          <LogoBox
            isLogin={isLogin}
            simpleLayout={simpleLayout}
            onToggleMenus={() => {
              this.onToggleMenus()
            }}
          />
          {/* 右边操作项 */}
          <OperateList
            isLogin={isLogin}
            simpleLayout={simpleLayout}
            lockStatus={lockStatus}
            lockError={lockError}
            lockAction={this.props.lockAction}
            refreshAction={this.props.refreshAction}
          />
        </Toolbar>
      </AppBar>
    )
  }
}
export default I18NHOC(withWidth()(TopHeader)) as any
