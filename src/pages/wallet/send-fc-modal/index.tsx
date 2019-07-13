import React, { Component } from 'react'
import BaseModal from '../send-base-modal/index'
import { IFC } from '../typings'

interface IProps extends IFC {
  isShow: boolean
  onClose?: () => void
  updateAction?: () => void
  onSendFc?: (data) => void
}
class SendCfxModal extends Component<IProps> {
  hideModal() {
    this.props.onClose()
  }
  setModalData() {
    const { lastFCSendSuccessHash, fcAvailableBalance } = this.props
    return { availableBalance: fcAvailableBalance, successHash: lastFCSendSuccessHash }
  }
  submitAciton(data) {
    this.props.onSendFc({
      toAddress: data.addressVal,
      sendAmount: data.balanceVal,
      gasPrice: data.gasPriceVal,
    })
  }
  render() {
    const { isShow, fcSending, fcSendFailed } = this.props
    const modalData = this.setModalData()
    return (
      <>
        <BaseModal
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
