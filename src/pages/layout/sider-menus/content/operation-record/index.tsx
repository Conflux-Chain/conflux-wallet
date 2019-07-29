import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
import config from '@/config'
interface IProps extends Partial<I18NProps> {
  currentAccountAddress: string
  lockStatus?: boolean
}
class Operation extends Component<IProps> {
  static defaultProps = { lockStatus: true }
  render() {
    const { lockStatus, I18N } = this.props
    return (
      <Tooltip title={I18N.Layout.OperationRecord.text}>
        <div className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}>
          {lockStatus ? (
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#iconjiaoyijilu" />
            </svg>
          ) : (
            <a
              href={`${config.scanHost}/accountdetail/${this.props.currentAccountAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.scanLink}
            >
              <svg className={styles.icon} aria-hidden="true">
                <use xlinkHref="#iconjiaoyijilu" />
              </svg>
            </a>
          )}
        </div>
      </Tooltip>
    )
  }
}
export default Operation
