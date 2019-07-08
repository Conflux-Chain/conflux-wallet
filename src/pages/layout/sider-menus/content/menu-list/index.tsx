import React, { Component } from 'react'
import styles from './style.module.scss'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import Images from '@/assets/images/index'

// interface IProps {
//   isLogin: boolean
//   mobileOpen: boolean
//   onToggleMenus?: () => void
// }

interface IState {
  currentActive: string
}
class SiderContent extends Component<{}, IState> {
  state = {
    currentActive: 'Wallet',
  }
  handleListItemClick() {}
  handleClose() {}
  render() {
    const { currentActive } = this.state
    return (
      <div className={styles.listWrap}>
        <List component="nav" aria-label="Secondary mailbox folder">
          <ListItem
            button
            alignItems="center"
            className={currentActive === 'Wallet' ? styles.listItemActive : styles.listItem}
            selected={currentActive === 'Wallet'}
            onClick={() => this.handleListItemClick()}
          >
            <p className={styles.listItemText}>Wallet</p>
          </ListItem>
          <ListItem button onClick={() => this.handleClose()} className={styles.listItem}>
            <p className={styles.listItemText}>
              {/* <svg className={styles.icon} aria-hidden="true">
                <use xlinkHref="#iconzhuyi" />
              </svg>{' '} */}
              Close Wallet
            </p>
          </ListItem>
        </List>
      </div>
    )
  }
}
export default SiderContent
