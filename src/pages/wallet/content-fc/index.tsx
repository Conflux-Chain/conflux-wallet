import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import SendFcModal from '../send-fc-modal/index'
import BalanceDetails from '../balance-details/index'
interface IState {
  showModal: boolean
}
class ContentCfx extends Component<{}, IState> {
  state = {
    showModal: false,
  }
  hideModal() {
    this.setState({
      showModal: false,
    })
  }
  render() {
    const { showModal } = this.state
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
            <p className={styles.balanceNum}>
              10,000
              <BalanceDetails>
                <svg className={styles.questionIcon} aria-hidden="true">
                  <use xlinkHref="#iconjieshi" />
                </svg>
              </BalanceDetails>
            </p>
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
