import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
import { namespace as globalCommonNamespace } from '@/models/global/common'
import { connect } from 'react-redux'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Paper from '@material-ui/core/Paper'
import ContentCfx from './content-cfx/index'
import ContentFc from './content-fc/index'
import FaucetFail from './faucet-fail/index'
import FaucetSuccess from './faucet-success/index'
import WalletContributors from './wallet-contributors'
import ReceiveCodeModal from '@/components/receive-code-modal/index'
import { IDispatch } from '@/typings'
import { namespace } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { IDvaProps } from './typings'
interface IProps extends IDvaProps, I18NProps, IDispatch {
  lockStatus?: boolean
  testState: number
}
interface IState {
  openReceiveCodeModal?: boolean
  openFaucetFailModal?: boolean
  openFaucetSuccessModal?: boolean
}
class Home extends Component<IProps, IState> {
  state = {
    openReceiveCodeModal: false,
    openFaucetFailModal: false,
    openFaucetSuccessModal: false,
  }
  componentDidMount() {
    this.updateCfxAction()
    this.updateFcAction()
  }

  // ******* cfx
  // 发送cfx
  onSendCfx(data) {
    const { toAddress, sendAmount, gasPrice, callback, errCallback } = data
    this.props.dispatch({
      type: `${namespace}/send`,
      payload: { toAddress, sendAmount, gasPrice },
      callback,
      errCallback,
    })
  }
  // 更新cfx
  updateCfxAction() {
    this.props.dispatch({
      type: `${namespace}/updateCfxBalance`,
    })
  }
  // 关闭cfx失败
  closeCfxFailedModal() {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: { cfxSendFailed: false },
    })
  }
  // 关闭cfx成功模态框
  closeCfxSuccessedModal() {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: { cfxSendSuccessed: false },
    })
  }
  // cfx水龙头
  getCfx() {
    const callback = this.getCfxSuccess
    const errCallback = this.getCfxFail
    this.props.dispatch({
      type: `${namespace}/getCfx`,
      payload: { address: this.props.currentAccountAddress },
      callback,
      errCallback,
    })
  }
  getCfxSuccess() {
    this.updateFcAction()
    this.setState({
      openFaucetSuccessModal: true,
    })
  }
  getCfxFail() {
    this.setState({
      openFaucetFailModal: true,
    })
  }
  // ******* fc
  // 发送fc
  onSendFc(data) {
    const { toAddress, value, gasPrice, callback, errCallback } = data
    this.props.dispatch({
      type: `${namespaceOfFc}/send`,
      payload: { toAddress, value, gasPrice },
      callback,
      errCallback,
    })
  }
  // 更新fc
  updateFcAction() {
    this.props.dispatch({
      type: `${namespaceOfFc}/updateFCBalance`,
    })
  }
  // 关闭fc失败
  closeFcFailedModal() {
    this.props.dispatch({
      type: `${namespaceOfFc}/setState`,
      payload: { fcSendFailed: false },
    })
  }
  // 关闭fc成功模态框
  closeFcSuccessedModal() {
    this.props.dispatch({
      type: `${namespaceOfFc}/setState`,
      payload: { fcSendSuccessed: false },
    })
  }
  receiveAction() {
    this.setState({
      openReceiveCodeModal: true,
    })
  }
  closeReceiveCodeModal() {
    this.setState({
      openReceiveCodeModal: false,
    })
  }

  render() {
    const { I18N, currentAccountAddress, cfxTx } = this.props
    const { openReceiveCodeModal, openFaucetFailModal, openFaucetSuccessModal } = this.state
    return (
      <div>
        <h2 className={styles.pageTitle}>{I18N.Wallet.MyWallet.title}</h2>
        <p className={styles.pageTips}>{I18N.Wallet.MyWallet.pageTips}</p>
        <div className={styles.cardWrap}>
          <Paper className={styles.pageCard}>
            <ContentCfx
              {...this.props}
              updateCfxAction={() => {
                this.updateCfxAction()
              }}
              receiveAction={() => {
                this.receiveAction()
              }}
              closeFailedModal={() => {
                this.closeCfxFailedModal()
              }}
              closeSuccessedModal={() => {
                this.closeCfxSuccessedModal()
              }}
              onSendCfx={sendData => {
                this.onSendCfx(sendData)
              }}
              getCfx={() => {
                this.getCfx()
              }}
            />
          </Paper>
          <Paper className={classnames(styles.pageCard, styles.cardFC)}>
            <ContentFc
              {...this.props}
              currentAccountAddress={this.props.currentAccountAddress}
              updateFcAction={() => {
                this.updateFcAction()
              }}
              receiveAction={() => {
                this.receiveAction()
              }}
              closeFailedModal={() => {
                this.closeFcFailedModal()
              }}
              closeSuccessedModal={() => {
                this.closeFcSuccessedModal()
              }}
              onSendFc={sendData => {
                this.onSendFc(sendData)
              }}
            />
          </Paper>
        </div>
        <WalletContributors I18N={I18N} />
        <ReceiveCodeModal
          currentAccountAddress={currentAccountAddress}
          openDialog={openReceiveCodeModal}
          onClose={() => {
            this.closeReceiveCodeModal()
          }}
        />
        <FaucetFail
          I18N={I18N}
          openDialog={openFaucetFailModal}
          onClose={() => {
            this.setState({ openFaucetFailModal: false })
          }}
        />
        <FaucetSuccess
          I18N={I18N}
          openDialog={openFaucetSuccessModal}
          cfxTx={cfxTx}
          onClose={() => {
            this.setState({ openFaucetSuccessModal: false })
          }}
        />
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
    ...models[namespaceOfFc],
    ...models[globalCommonNamespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Home))
