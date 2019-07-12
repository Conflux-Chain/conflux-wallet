import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Images from '@/assets/images/index'
import styles from './style.module.scss'
import BalanceDetailsModal from '../balance-details-modal/index'
import { IFC } from '../typings'
interface IProps extends IFC {
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
    const { anchorEl } = this.props
    const open = Boolean(anchorEl)
    const { showModal } = this.state
    return (
      <div className={styles.tooltipWrap}>
        <div className={styles.iconWrap}>{this.props.children}</div>
        <ClickAwayListener
          onClickAway={() => {
            this.tipClose()
          }}
        >
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={isWidthUp('sm', this.props.width) ? 'left' : 'top'}
          >
            <div className={styles.modalContent}>
              <h4 className={styles.modalTitle}>Balance Details</h4>
              <div className={styles.balanceDataBox}>
                <div className={styles.pathLeftWrap}>
                  <div className={styles.balanceTotalBox}>
                    <p className={styles.balanceTotalTitle}>Total Balance</p>
                    <p className={styles.balanceTotalNum}>{this.props.fcTotalBalance}</p>
                  </div>
                  <img src={Images.pathLeft} alt="" className={styles.pathLeft} />
                </div>
                <div className={styles.balanceAllBox}>
                  <div className={styles.balanceAvailableBox}>
                    <div className={styles.freeBalanceBox}>
                      <p className={styles.balanceValTitle}>Free Balance</p>
                      <p className={styles.balanceValNum}>{this.props.fcPersonalFreeBalance}</p>
                    </div>
                    <div className={styles.personalUnlockedBalanceBox}>
                      <p className={styles.balanceValTitle}>Personal Unlocked Balance</p>
                      <p className={styles.balanceValNum}>{this.props.fcPersonalUnLockBalance}</p>
                    </div>
                    <div className={styles.pathRightWrap}>
                      <img src={Images.pathRight} alt="" className={styles.pathRight} />
                      <div className={styles.balanceTotalBox}>
                        <p className={styles.balanceTotalTitle}>Available Balance</p>
                        <p className={styles.balanceTotalNum}>{this.props.fcAvailableBalance}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.personalLockedBalanceBox}>
                    <p className={styles.balanceValTitle}>Personal Locked Balance</p>
                    <p className={styles.balanceValNum}>{this.props.fcPersonalLockBalance}</p>
                  </div>
                </div>
                <div
                  className={styles.viewMoreBox}
                  onClick={() => {
                    this.showViewBox()
                  }}
                >
                  <svg className={styles.icon} aria-hidden="true">
                    <use xlinkHref="#iconiconfontlock" />
                  </svg>
                  <span>
                    View More{' '}
                    <svg className={styles.icon} aria-hidden="true">
                      <use xlinkHref="#icongengduo1" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Popper>
        </ClickAwayListener>
        <BalanceDetailsModal
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
