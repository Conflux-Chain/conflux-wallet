import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Link } from 'react-router-dom'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import SendFcModal from '../send-fc-modal/index'
import BalanceDetails from '../balance-details/index'
import FcDetails from '../fc-details/index'
import SendFail from '../send-fail/index'
import SendSuccess from '../send-success/index'
import { IFC } from '../typings'
import { I18NProps } from '@/i18n/context'
import config from '@/config'
interface IProps extends IFC, Partial<I18NProps> {
  lockStatus?: boolean
  updateFcAction?: () => void
  closeFailedModal?: () => void
  closeSuccessedModal?: () => void
  receiveAction?: () => void
  onSendFc?: (data) => void
  width?: Breakpoint
  currentAccountAddress: string
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
  onSendFc(data) {
    this.props.onSendFc(data)
  }
  // 关闭send失败模态框
  closeFailedModal() {
    this.props.closeFailedModal()
  }
  // 关闭send成功模态框
  closeSuccessedModal() {
    this.props.closeSuccessedModal()
  }
  // 接受
  receiveAction() {
    this.props.receiveAction()
  }
  sendSuccess() {
    this.props.updateFcAction()
    this.setState({
      showModal: false,
    })
  }
  render() {
    const { showModal, balanceDetailsTips, fcDetailsTips } = this.state
    const { lockStatus, fcSendFailed, fcSendSuccessed, I18N } = this.props
    return (
      <div className={styles.cardContent}>
        <div className={styles.infoBox}>
          <div className={styles.infoBoxTop}>
            <div className={styles.walletHeader}>
              <svg aria-hidden="true" className={styles.walletImg}>
                <use xlinkHref="#iconfc-icon" />
              </svg>
              <p className={styles.walletName}>Fans Coin</p>
            </div>
            <div className={styles.walletBalance}>
              <p className={styles.walletBalanceTitle}>{I18N.Wallet.MyWallet.totalBalance}</p>
              <p className={styles.walletBalanceTotal}>{this.props.fcTotalBalance}</p>
            </div>
          </div>
          <div className={styles.balanceBox}>
            <div className={styles.balanceTitle}>
              {I18N.Wallet.MyWallet.availableBalance}
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
                >
                  <use xlinkHref="#iconjieshi" />
                </svg>
              </BalanceDetails>
            </div>
            <div className={styles.balanceNum}>{this.props.fcAvailableBalance}</div>
          </div>
        </div>
        <div>
          <div className={styles.btnBox}>
            <Button
              disabled={lockStatus}
              variant="contained"
              color="primary"
              className={lockStatus ? styles.btnLock : styles.btn}
              onClick={() => {
                this.props.updateFcAction()
                this.setState({
                  showModal: true,
                })
              }}
            >
              {I18N.Wallet.MyWallet.sendBtn}
            </Button>
            <SendFcModal
              {...this.props}
              currentAccountAddress={this.props.currentAccountAddress}
              isShow={showModal}
              onSendFc={sendData => {
                this.onSendFc({
                  ...sendData,
                  callback: this.sendSuccess.bind(this),
                  errCallback: e => {
                    alert(e)
                  },
                })
              }}
              updateAction={() => {
                this.props.updateFcAction()
              }}
              onClose={() => {
                this.hideModal()
              }}
            />
            <Button
              variant="outlined"
              color="primary"
              className={styles.btn}
              disabled={lockStatus}
              onClick={() => {
                this.receiveAction()
              }}
            >
              {I18N.Wallet.MyWallet.receiveBtn}
            </Button>
          </div>
          <div className={lockStatus ? styles.seeContractBoxLock : styles.seeContractBox}>
            <p>
              {lockStatus ? (
                <>
                  {I18N.Wallet.MyWallet.viewContract}{' '}
                  <svg className={styles.moreIcon} aria-hidden="true">
                    <use xlinkHref="#icongengduo1" />
                  </svg>
                </>
              ) : (
                <a href={`${config.scanHost}/blocktxn`} target="_blank" rel="noopener noreferrer">
                  {I18N.Wallet.MyWallet.viewContract}{' '}
                  <svg className={styles.moreIcon} aria-hidden="true">
                    <use xlinkHref="#icongengduo1" />
                  </svg>
                </a>
              )}
            </p>
          </div>
        </div>
        <div className={styles.fcQuestionBtn}>
          <FcDetails
            I18N={I18N}
            anchorEl={fcDetailsTips}
            onClose={() => {
              this.setState({
                fcDetailsTips: null,
              })
            }}
          >
            {isWidthUp('sm', this.props.width) ? (
              <svg
                className={classnames(
                  styles.fcQuestionIcon,
                  fcDetailsTips ? styles.fcQuestionIconActive : null
                )}
              >
                <use xlinkHref="#iconjieshi" />
              </svg>
            ) : (
              <Link to="/about">
                <svg
                  className={classnames(
                    styles.fcQuestionIcon,
                    fcDetailsTips ? styles.fcQuestionIconActive : null
                  )}
                >
                  <use xlinkHref="#iconjieshi" />
                </svg>
              </Link>
            )}
          </FcDetails>
        </div>
        <SendFail
          I18N={I18N}
          openDialog={fcSendFailed}
          onClose={() => {
            this.closeFailedModal()
          }}
        />
        <SendSuccess
          lastSendSuccessHash={this.props.lastFCSendSuccessHash}
          I18N={I18N}
          openDialog={fcSendSuccessed}
          onClose={() => {
            this.closeSuccessedModal()
          }}
        />
      </div>
    )
  }
}
export default withWidth()(ContentFC)
