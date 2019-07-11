import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import SendFcModal from '../send-fc-modal/index'
import BalanceDetails from '../balance-details/index'
interface IState {
  showModal: boolean
  balanceDetailsTips: null | HTMLElement
}
class ContentCfx extends Component<{}, IState> {
  state = {
    showModal: false,
    balanceDetailsTips: null,
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
  render() {
    const { showModal, balanceDetailsTips } = this.state
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
              <p className={styles.walletBalanceTotal}>12,335.4</p>
            </div>
          </div>
          <div className={styles.balanceBox}>
            <p className={styles.balanceTitle}>Available Balance</p>
            <div className={styles.balanceNum}>
              10,000
              <BalanceDetails
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
            <Button variant="outlined" color="primary" className={styles.btn}>
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
          <svg className={styles.fcQuestionIcon} aria-hidden="true">
            <use xlinkHref="#iconjieshi" />
          </svg>
        </div>
      </div>
    )
  }
}
export default ContentCfx
