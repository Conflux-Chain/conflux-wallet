import React, { Component } from 'react'
import styles from './style.module.scss'
// import Images from '@/assets/images/index'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import SiderContent from './content/index'
interface IProps {
  isLogin: boolean
  lockStatus: boolean
  mobileOpen: boolean
  onToggleMenus?: () => void
}

class OperateList extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  handleDrawerToggle() {
    this.props.onToggleMenus()
  }
  render() {
    const { isLogin, lockStatus, mobileOpen } = this.props
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
                <SiderContent lockStatus={lockStatus} />
              </Drawer>
            </Hidden>
            <Hidden xsDown>
              <Drawer variant="permanent" open className={styles.siderMenusWrap}>
                <SiderContent lockStatus={lockStatus} />
              </Drawer>
            </Hidden>
          </React.Fragment>
        ) : null}
      </>
    )
  }
}
export default OperateList
