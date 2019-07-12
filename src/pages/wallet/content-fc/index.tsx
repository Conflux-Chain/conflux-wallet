import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import SendFcModal from '../send-fc-modal/index'
import BalanceDetails from '../balance-details/index'
import FcDetails from '../fc-details/index'
import { IFC } from '../typings'
interface IProps extends IFC {
  lockStatus?: boolean
}
interface IState {
  showModal: boolean
  balanceDetailsTips: null | HTMLElement
  fcDetailsTips: null | HTMLElement
}
class ContentFC extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    showModal: false,
    balanceDetailsTips: null,
    fcDetailsTips: null,
  }
  hideModal() {
    this.setState({
      showModal: false,
    })
  }
  showBalanceDetailsTips(e) {
    this.setState({
      balanceDetailsTips: e.currentTarget,
    })
  }
  showFcDetailsTipsTips(e) {
    this.setState({
      fcDetailsTips: e.currentTarget,
    })
  }
  render() {
    const { showModal, balanceDetailsTips, fcDetailsTips } = this.state
    const { lockStatus } = this.props
    return (
      <div className={styles.cardContent}>
        <div className={styles.infoBox}>
          <div className={styles.infoBoxTop}>
            <div className={styles.walletHeader}>
              <svg aria-hidden="true" className={styles.walletImg}>
                <use xlinkHref="#iconFC-" />
              </svg>
              <p className={styles.walletName}>Fans Coin</p>
            </div>
            <div className={styles.walletBalance}>
              <p className={styles.walletBalanceTitle}>Total Balance</p>
              <p className={styles.walletBalanceTotal}>{this.props.fcTotalBalance}</p>
            </div>
          </div>
          <div className={styles.balanceBox}>
            <p className={styles.balanceTitle}>Available Balance</p>
            <div className={styles.balanceNum}>
              {this.props.fcAvailableBalance}
              <BalanceDetails
                {...this.props}
                anchorEl={balanceDetailsTips}
                onClose={() => {
                  this.setState({
                    balanceDetailsTips: null,
                  })
                }}
              >
                <svg
                  className={classnames(
                    styles.questionIcon,
                    balanceDetailsTips ? styles.questionIconActive : null
                  )}
                  aria-hidden="true"
                  onClick={e => {
                    this.showBalanceDetailsTips(e)
                  }}
                >
                  <use xlinkHref="#iconjieshi" />
                </svg>
              </BalanceDetails>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.btnBox}>
            <Button
              disabled={lockStatus}
              variant="contained"
              color="primary"
              className={styles.btn}
              onClick={() => {
                this.setState({
                  showModal: true,
                })
              }}
            >
              Send
            </Button>
            <SendFcModal
              isShow={showModal}
              onClose={() => {
                this.hideModal()
              }}
            />
            <Button variant="outlined" color="primary" className={styles.btn} disabled={lockStatus}>
              Receive
            </Button>
          </div>
          <div className={styles.seeContractBox}>
            <p>
              See the Contract{' '}
              <svg className={styles.moreIcon} aria-hidden="true">
                <use xlinkHref="#icongengduo1" />
              </svg>
            </p>
          </div>
        </div>
        <div className={styles.fcQuestionBtn}>
          <FcDetails
            anchorEl={fcDetailsTips}
            onClose={() => {
              this.setState({
                fcDetailsTips: null,
              })
            }}
          >
            <svg
              className={classnames(
                styles.fcQuestionIcon,
                fcDetailsTips ? styles.fcQuestionIconActive : null
              )}
              aria-hidden="true"
              onClick={e => {
                this.showFcDetailsTipsTips(e)
              }}
            >
              <use xlinkHref="#iconjieshi" />
            </svg>
          </FcDetails>
        </div>
      </div>
    )
  }
}
export default ContentFC
