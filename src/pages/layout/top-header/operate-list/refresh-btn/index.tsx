import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
interface IProps {
  isLogin?: boolean
  lockStatus?: boolean
}
class RefreshBtn extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  render() {
    const { isLogin, lockStatus } = this.props
    return (
      <>
        {isLogin ? (
          <div
            className={classnames(styles.operateListItem, lockStatus ? styles.lockStatus : null)}
          >
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#iconshuaxin1" />
            </svg>
            Refresh
          </div>
        ) : null}
      </>
    )
  }
}
export default RefreshBtn
