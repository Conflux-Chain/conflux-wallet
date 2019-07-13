import React, { Component } from 'react'
import styles from './style.module.scss'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
interface IProps {
  isLogin: boolean
  simpleLayout?: boolean
  onToggleMenus?: () => void
}
class Operation extends Component<IProps> {
  onToggleMenus() {
    this.props.onToggleMenus()
  }
  render() {
    const { isLogin, simpleLayout } = this.props
    return (
      <>
        {isLogin && !simpleLayout ? (
          <React.Fragment>
            <Hidden smUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={() => {
                  this.onToggleMenus()
                }}
              >
                <MenuIcon color="inherit" />
              </IconButton>
            </Hidden>
            <Hidden xsDown>
              <svg className={styles.headerLogo} aria-hidden="true">
                <use xlinkHref="#iconlogo_hengban" />
              </svg>
            </Hidden>
          </React.Fragment>
        ) : (
          <svg className={styles.headerLogo} aria-hidden="true">
            <use xlinkHref="#iconlogo_hengban" />
          </svg>
        )}
      </>
    )
  }
}
export default Operation
