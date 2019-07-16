import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import LockWalletModal from './lock-wallet-modal/index'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
type IProps = I18NProps & {
  isLogin: boolean
  lockStatus?: boolean
  lockError?: boolean
  lockAction?: (val) => void
}
interface IState {
  showModal: boolean
}
class LockWallet extends Component<IProps, IState> {
  state = {
    showModal: false,
  }
  showLockModal() {
    this.setState({
      showModal: true,
    })
  }
  hideLockModal() {
    this.setState({
      showModal: false,
    })
  }
  render() {
    const { isLogin, lockStatus, lockError, I18N } = this.props
    const { showModal } = this.state
    return (
      <>
        {isLogin ? (
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              className={styles.headerBtn}
              onClick={() => {
                this.showLockModal()
              }}
            >
              <svg className={styles.icon} aria-hidden="true">
                <use xlinkHref={lockStatus ? '#iconsuo1' : '#iconlock'} />
              </svg>
              {lockStatus ? I18N.Layout.LockWallet.unlock : I18N.Layout.LockWallet.lock}
            </Button>
            <LockWalletModal
              I18N={I18N}
              lockStatus={lockStatus}
              isShow={showModal}
              hasError={lockError}
              lockAction={this.props.lockAction}
              onClose={() => {
                this.hideLockModal()
              }}
            />
          </React.Fragment>
        ) : null}
      </>
    )
  }
}
export default I18NHOC(LockWallet) as any
