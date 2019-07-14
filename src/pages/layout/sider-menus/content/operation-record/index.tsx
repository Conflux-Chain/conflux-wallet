import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  lockStatus?: boolean
}
class Operation extends Component<IProps> {
  static defaultProps = { lockStatus: true }
  clickHandle() {}
  render() {
    const { lockStatus, I18N } = this.props
    return (
      <Tooltip title={I18N.Layout.OperationRecord.text}>
        <div className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}>
          <img src={Images.record} alt="" className={styles.icon} onClick={this.clickHandle} />
        </div>
      </Tooltip>
    )
  }
}
export default Operation
