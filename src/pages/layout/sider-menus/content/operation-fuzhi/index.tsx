import React, { Component } from 'react'
import classnames from 'classnames'

import Tooltip from '@material-ui/core/Tooltip'

import copy from 'copy-to-clipboard'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  lockStatus?: boolean
  currentAccountAddress?: string
  copied?: () => void
}

class Operation extends Component<IProps> {
  static defaultProps = { lockStatus: true }

  clickHandle() {
    copy(this.props.currentAccountAddress)
    this.props.copied()
  }

  render() {
    const { lockStatus, I18N } = this.props
    return (
      <>
        <Tooltip title={I18N.Layout.OperationFuzhi.text}>
          <div
            className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}
            onClick={() => {
              if (!lockStatus) {
                this.clickHandle()
              }
            }}
          >
            <svg
              className={styles.icon}
              aria-hidden="true"
              onClick={() => {
                if (!lockStatus) {
                  this.clickHandle()
                }
              }}
            >
              <use xlinkHref="#iconfuzhi-" />
            </svg>
          </div>
        </Tooltip>
      </>
    )
  }
}
export default Operation
