import React, { Component } from 'react'
import styles from './style.module.scss'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import Images from '@/assets/images/index'

interface IProps {
  lockStatus: boolean
  closeAction?: () => void
}

interface IState {
  currentActive: string
}
class SiderContent extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    currentActive: 'Wallet',
  }
  handleListItemClick() {}
  handleClose() {
    this.props.closeAction()
  }
  render() {
    const { currentActive } = this.state
    const { lockStatus } = this.props
    return (
      <div className={styles.listWrap}>
        <List component="nav" aria-label="Secondary mailbox folder">
          <ListItem
            disabled={lockStatus}
            button
            alignItems="center"
            className={currentActive === 'Wallet' ? styles.listItemActive : styles.listItem}
            selected={currentActive === 'Wallet'}
            onClick={() => this.handleListItemClick()}
          >
            <p className={styles.listItemText}>Wallet</p>
          </ListItem>
          <ListItem
            button
            onClick={() => this.handleClose()}
            className={styles.listItem}
            disabled={lockStatus}
          >
            <p className={styles.listItemText}>
              <svg className={styles.icon} aria-hidden="true">
                <use xlinkHref="#iconguanji" />
              </svg>{' '}
              Close Wallet
            </p>
          </ListItem>
        </List>
      </div>
    )
  }
}
export default SiderContent
