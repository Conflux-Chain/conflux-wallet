import React, { Component } from 'react'
import BaseModal from '../send-base-modal/index'
import { IFC } from '../typings'
import { I18NProps } from '@/i18n/context'
interface IProps extends IFC, Partial<I18NProps> {
  isShow: boolean
  onClose?: () => void
  updateAction?: () => void
  onSendFc?: (data) => void
  currentAccountAddress: string
}
class SendCfxModal extends Component<IProps> {
  hideModal() {
    this.props.onClose()
  }
  setModalData() {
    const { lastFCSendSuccessHash, fcAvailableBalance, currentAccountAddress } = this.props
    return {
      availableBalance: fcAvailableBalance,
      successHash: lastFCSendSuccessHash,
      currentAccountAddress,
    }
  }
  submitAciton(data) {
    this.props.onSendFc({
      toAddress: data.addressVal,
      value: data.balanceVal,
      gasPrice: data.gasPriceVal,
    })
  }
  render() {
    const { isShow, fcSending, fcSendFailed, I18N } = this.props
    const modalData = this.setModalData()
    return (
      <>
        <BaseModal
          I18N={I18N}
          modalData={modalData}
          unit={'FC'}
          sending={fcSending}
          sendFailed={fcSendFailed}
          isShow={isShow}
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
