import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import Images from '@/assets/images/index'
import styles from './style.module.scss'
import BalanceDetailsModal from '../balance-details-modal/index'
import { IFC } from '../typings'
import { I18NProps } from '@/i18n/context'
interface IProps extends IFC, Partial<I18NProps> {
  anchorEl: null | HTMLElement
  onClose?: () => void
  width?: Breakpoint
}
interface IState {
  showModal: boolean
}
class BalanceDetails extends Component<IProps, IState> {
  state = {
    showModal: false,
  }
  tipClose() {
    this.props.onClose()
  }
  showModal() {
    this.setState({
      showModal: true,
    })
  }
  hideModal() {
    this.setState({
      showModal: false,
    })
  }
  showViewBox() {
    this.tipClose()
    this.showModal()
  }
  render() {
    const { I18N } = this.props
    const { showModal } = this.state
    return (
      <div className={styles.tooltipWrap}>
        <div className={styles.iconWrap}>
          {this.props.children}
          <div
            className={
              isWidthUp('sm', this.props.width) ? styles.modalContent : styles.modalContentM
            }
          >
            <h4 className={styles.modalTitle}>{I18N.Wallet.BalanceDetails.balanceDetails}</h4>
            <div className={styles.balanceDataBox}>
              <div className={styles.pathLeftWrap}>
                <div className={styles.balanceTotalBox}>
                  <p className={styles.balanceTotalTitle}>
                    {I18N.Wallet.BalanceDetails.totalBalance}
                  </p>
                  <p className={styles.balanceTotalNum}>{this.props.fcTotalBalance}</p>
                </div>
                <img src={Images.pathLeft} alt="" className={styles.pathLeft} />
              </div>
              <div className={styles.balanceAllBox}>
                <div className={styles.balanceAvailableBox}>
                  <div className={styles.freeBalanceBox}>
                    <p className={styles.balanceValTitle}>
                      {I18N.Wallet.BalanceDetails.freeBalance}
                    </p>
                    <p className={styles.balanceValNum}>{this.props.fcPersonalFreeBalance}</p>
                  </div>
                  <div className={styles.personalUnlockedBalanceBox}>
                    <p className={styles.balanceValTitle}>
                      {I18N.Wallet.BalanceDetails.personalUnlockedBalance}
                    </p>
                    <p className={styles.balanceValNum}>{this.props.fcPersonalUnLockBalance}</p>
                  </div>
                  <div className={styles.pathRightWrap}>
                    <img src={Images.pathRight} alt="" className={styles.pathRight} />
                    <div className={styles.balanceTotalBox}>
                      <p className={styles.balanceTotalTitle}>
                        {I18N.Wallet.BalanceDetails.availableBalance}
                      </p>
                      <p className={styles.balanceTotalNum}>{this.props.fcAvailableBalance}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.personalLockedBalanceBox}>
                  <p className={styles.balanceValTitle}>
                    {I18N.Wallet.BalanceDetails.personalLockedBalance}
                  </p>
                  <p className={styles.balanceValNum}>{this.props.fcPersonalLockBalance}</p>
                </div>
              </div>
              <div
                className={styles.viewMoreBox}
                // onClick={() => {
                //   this.showViewBox()
                // }}
              >
                <a href="/about" target="_blank">
                  <svg className={styles.icon} aria-hidden="true">
                    <use xlinkHref="#iconiconfontlock" />
                  </svg>
                  <span>
                    {I18N.Wallet.BalanceDetails.viewMore}{' '}
                    <svg className={styles.icon} aria-hidden="true">
                      <use xlinkHref="#icongengduo1" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <BalanceDetailsModal
          I18N={I18N}
          isShow={showModal}
          onClose={() => {
            this.hideModal()
          }}
        />
      </div>
    )
  }
}
export default withWidth()(BalanceDetails)
