import React, { Component } from 'react'
import styles from './style.module.scss'
interface IProps {
  isLogin?: boolean
  lockStatus?: boolean
}
class DeployBtn extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  render() {
    const { isLogin } = this.props
    return (
      <>
        {isLogin ? (
          <div className={styles.operateListItem}>
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#icondiannaopcxianshiqi" />
            </svg>
            Deploy
          </div>
        ) : null}
      </>
    )
  }
}
export default DeployBtn
