import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  anchorEl: null | HTMLElement
  onClose?: () => void
  width?: Breakpoint
}
class FcDetails extends Component<IProps> {
  state = {
    showModal: false,
  }
  tipClose() {
    this.props.onClose()
  }
  render() {
    const { I18N } = this.props
    return (
      <div className={styles.tooltipWrap}>
        <div className={styles.iconWrap}>
          {this.props.children}
          {isWidthUp('sm', this.props.width) ? (
            <div className={styles.fcDetailsContentWrap}>
              <div className={styles.fcDetailsContent}>
                <p>{I18N.Wallet.FansCoinDetails.detailText}</p>
                <a href="/about" target="_blank">
                  <p className={styles.fcDetailsLink}>
                    {I18N.Wallet.FansCoinDetails.viewMore}{' '}
                    <svg className={styles.icon} aria-hidden="true">
                      <use xlinkHref="#icongengduo1" />
                    </svg>
                  </p>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
export default withWidth()(FcDetails)
