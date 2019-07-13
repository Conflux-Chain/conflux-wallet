import React, { Component } from 'react'
import BaseModal from '../send-base-modal/index'
import { ICFX } from '../typings'
interface IProps extends ICFX {
  isShow: boolean
  onClose?: () => void
  onSendCfx?: (data) => void
}
class SendCfxModal extends Component<IProps> {
  hideModal() {
    this.props.onClose()
  }
  setModalData() {
    const { cfxBalance, lastCfxSendSuccessHash } = this.props
    return { availableBalance: cfxBalance, successHash: lastCfxSendSuccessHash }
  }
  submitAciton(data) {
    this.props.onSendCfx({
      toAddress: data.addressVal,
      sendAmount: data.balanceVal,
      gasPrice: data.gasPriceVal,
    })
  }
  render() {
    const { isShow, cfxSending, cfxSendFailed } = this.props
    const modalData = this.setModalData()
    return (
      <>
        <BaseModal
          modalData={modalData}
          isShow={isShow}
          sending={cfxSending}
          sendFailed={cfxSendFailed}
          unit={'CFX'}
          sendAction={submitData => {
            this.submitAciton(submitData)
          }}
          onClose={() => {
            this.hideModal()
          }}
        />
      </>
    )
  }
}
export default SendCfxModal
