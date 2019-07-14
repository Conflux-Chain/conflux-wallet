import React, { Component } from 'react'
import BaseModal from '../send-base-modal/index'
import { ICFX } from '../typings'
import { I18NProps } from '@/i18n/context'
interface IProps extends ICFX, Partial<I18NProps> {
  isShow: boolean
  onClose?: () => void
  updateAction?: () => void
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
    const { isShow, cfxSending, cfxSendFailed, I18N } = this.props
    const modalData = this.setModalData()
    return (
      <>
        <BaseModal
          I18N={I18N}
          modalData={modalData}
          isShow={isShow}
          sending={cfxSending}
          sendFailed={cfxSendFailed}
          unit={'CFX'}
          updateAction={() => {
            this.props.updateAction()
          }}
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
