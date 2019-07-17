import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
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
          <svg
            className={styles.icon}
            aria-hidden="true"
            onClick={() => {
              if (!lockStatus) {
                this.clickHandle()
              }
            }}
          >
            <use xlinkHref="#iconjiaoyijilu" />
          </svg>
        </div>
      </Tooltip>
    )
  }
}
export default Operation
