import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
// import Images from '@/assets/images/index'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import SiderContent from './content/index'
import Snackbar from '@material-ui/core/Snackbar'
import { I18NProps } from '@/i18n/context'
import { I18NHOC } from '@/utils/tools/react'
type IProps = I18NProps & {
  /** 钱包地址 */
  closeAction?: () => void
  currentAccountAddress: string
  isLogin: boolean
  lockStatus: boolean
  mobileOpen: boolean
  onToggleMenus?: () => void
  currentAccountPrivateKey: string
  width?: Breakpoint
}
interface IState {
  openFuzhiMsg?: boolean
}
class OperateList extends Component<IProps, IState> {
  static defaultProps = { isLogin: false, lockStatus: true }
  state = {
    openFuzhiMsg: false,
  }
  handleCloseFuzhiMsg() {
    this.setState({
      openFuzhiMsg: false,
    })
  }
  handleDrawerToggle() {
    this.props.onToggleMenus()
  }
  render() {
    const {
      isLogin,
      lockStatus,
      mobileOpen,
      currentAccountPrivateKey,
      currentAccountAddress,
      I18N,
    } = this.props
    const SiderContentProps = {
      copied: () => {
        this.setState({
          openFuzhiMsg: true,
        })
      },
      closeAction: () => {
        this.props.closeAction()
      },
      currentAccountPrivateKey,
      currentAccountAddress,
      lockStatus,
    }
    const cWidth = this.props.width
    const { openFuzhiMsg } = this.state
    return (
      <>
        {isLogin ? (
          <React.Fragment>
            <Hidden smUp>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => {
                  this.handleDrawerToggle()
                }}
                className={styles.siderMenusWrap}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <SiderContent {...SiderContentProps} />
              </Drawer>
            </Hidden>
            <Hidden xsDown>
              <Drawer variant="permanent" open className={styles.siderMenusWrap}>
                <SiderContent {...SiderContentProps} />
              </Drawer>
            </Hidden>
          </React.Fragment>
        ) : null}
        <Snackbar
          className={styles.snackbar}
          anchorOrigin={{
            vertical: isWidthUp('sm', cWidth) ? 'top' : 'bottom',
            horizontal: isWidthUp('sm', cWidth) ? 'left' : 'center',
          }}
          open={openFuzhiMsg}
          autoHideDuration={20000}
          onClose={() => {
            this.handleCloseFuzhiMsg()
          }}
          message={<span>{I18N.Layout.OperationFuzhi.copied}</span>}
        />
      </>
    )
  }
}
export default I18NHOC(withWidth()(OperateList)) as any
