import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
type IProps = I18NProps & {
  isLogin?: boolean
  lockStatus?: boolean
}
class RefreshBtn extends Component<IProps> {
  static defaultProps = { isLogin: false, lockStatus: true }
  render() {
    const { isLogin, lockStatus, I18N } = this.props
    return (
      <>
        {isLogin ? (
          <div
            className={classnames(styles.operateListItem, lockStatus ? styles.lockStatus : null)}
          >
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#iconshuaxin1" />
            </svg>
            {I18N.Layout.RefreshBtn.text}
          </div>
        ) : null}
      </>
    )
  }
}
export default I18NHOC(RefreshBtn) as any
