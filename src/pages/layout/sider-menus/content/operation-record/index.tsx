import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
interface IProps {
  lockStatus?: boolean
}
class Operation extends Component<IProps> {
  static defaultProps = { lockStatus: true }
  clickHandle() {}
  render() {
    const { lockStatus } = this.props
    return (
      <Tooltip title="View all transactions">
        <div className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}>
          <img src={Images.record} alt="" className={styles.icon} onClick={this.clickHandle} />
        </div>
      </Tooltip>
    )
  }
}
export default Operation
