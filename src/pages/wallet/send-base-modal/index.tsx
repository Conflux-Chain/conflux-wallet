import React, { Component } from 'react'
import BigNumber from 'bignumber.js'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
import { normalGasForSend } from '../../../models/cfx'
interface ISubmitData {
  balanceVal: number
  addressVal: string
  gasPriceVal: string
}
interface IModalData {
  availableBalance: number
  successHash: string
  currentAccountAddress: string
}
interface IProps extends Partial<I18NProps> {
  modalData?: IModalData
  isShow: boolean
  sending?: boolean
  sendFailed?: boolean
  unit: string
  onClose?: () => void
  sendAction?: (data: ISubmitData) => void
  updateAction?: () => void
}
interface IState {
  balanceVal?: number
  addressVal?: string
  gasPriceVal?: string
  hasError?: boolean
}

class SendBaseModal extends Component<IProps, IState> {
  state = {
    balanceVal: 0,
    addressVal: '',
    gasPriceVal: '10',
    hasError: false,
  }
  handleClose() {
    this.props.onClose()
  }
  balanceChange(event) {
    let value = event.target.value
    const max = this.getTotalAvailableBalance(this.state.gasPriceVal)
    if (value > max) {
      value = max
    }
    this.setState({
      balanceVal: value,
    })
  }
  async transferAllAction() {
    await this.props.updateAction()
    const availableBalance = this.getTotalAvailableBalance(this.state.gasPriceVal)

    this.setState({
      balanceVal: availableBalance,
    })
  }
  getTotalAvailableBalance(gasPrice) {
    const { modalData, unit } = this.props
    let totalBalance = new BigNumber(modalData.availableBalance)
    if (unit === 'CFX') {
      const gasPriceVal = new BigNumber(gasPrice)
      const gasFee = gasPriceVal.dividedBy(10 ** 9).multipliedBy(normalGasForSend)
      totalBalance = totalBalance.minus(gasFee)
    }
    return totalBalance.toNumber()
  }
  isSendAll() {
    const { balanceVal, gasPriceVal } = this.state
    const availableBalance = this.getTotalAvailableBalance(gasPriceVal)
    return availableBalance === balanceVal
  }
  addressChange(event) {
    this.setState({
      addressVal: event.target.value.toLocaleLowerCase(),
    })
  }
  gasPriceChange(event) {
    const availableBalance = this.getTotalAvailableBalance(event.target.value)
    let balanceVal = this.state.balanceVal
    if (this.isSendAll()) {
      balanceVal = availableBalance
    }
    this.setState({
      balanceVal,
      gasPriceVal: event.target.value,
    })
  }
  gasPriceValChange(event, newValue) {
    const availableBalance = this.getTotalAvailableBalance(newValue)
    let balanceVal = this.state.balanceVal
    if (this.isSendAll()) {
      balanceVal = availableBalance
    }
    this.setState({
      balanceVal,
      gasPriceVal: newValue,
    })
  }
  submitForm() {
    const { balanceVal, addressVal, gasPriceVal } = this.state
    const reg = /^0x[0-9a-fA-F]{40}$/
    if (!reg.test(addressVal)) {
      this.setState({ hasError: true })
      return false
    }
    if (!this.props.sending) {
      this.props.sendAction({ balanceVal, addressVal, gasPriceVal })
    }
  }
  render() {
    const { isShow, unit, modalData, I18N, sending } = this.props
    const { balanceVal, addressVal, gasPriceVal, hasError } = this.state
    return (
      <Dialog
        onClose={() => {
          this.handleClose()
        }}
        className={styles.dialog}
        open={isShow}
      >
        <MuiDialogTitle>
          <div>
            <h1 className={styles.dialogTitle}>{I18N.Wallet.SendModal.sendTransaction}</h1>
          </div>
          <IconButton
            aria-label="Close"
            className={styles.dialogCloseBtn}
            onClick={() => {
              this.handleClose()
            }}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <div className={styles.sendFormContent}>
          <div className={styles.fromCode}>
            <label className={styles.fromLabel}>{I18N.Wallet.SendModal.from}</label>
            <p>{modalData.currentAccountAddress}</p>
          </div>
          <div className={styles.balanceWrap}>
            <div className={styles.balanceInput}>
              <TextField
                className={styles.inputText}
                label={`${I18N.Wallet.SendModal.palceHolder1}${new BigNumber(
                  modalData.availableBalance
                ).toFixed(4, 1)}`}
                value={balanceVal}
                onChange={e => {
                  this.balanceChange(e)
                }}
              />
              <span className={styles.unit}>{unit}</span>
            </div>
            <div className={styles.balanceTransferAll}>
              <Button
                color="primary"
                className={styles.balanceTransferAllText}
                onClick={() => {
                  this.transferAllAction()
                }}
              >
                {I18N.Wallet.SendModal.sendAll}
              </Button>
            </div>
          </div>
          <div className={styles.addressWrap}>
            <FormControl className={styles.formBox} error={hasError}>
              <InputLabel>{I18N.Wallet.SendModal.toAddress}</InputLabel>
              <Input
                placeholder={I18N.Wallet.SendModal.palceHolder2}
                value={addressVal}
                onChange={e => {
                  this.addressChange(e)
                }}
              />
              {hasError ? (
                <FormHelperText className={styles.formErrorText}>
                  {I18N.Wallet.SendModal.formErrorText}
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <div className={styles.priceWrap}>
            <div className={styles.priceInputWrap}>
              <label className={styles.fromLabel}>{I18N.Wallet.SendModal.gasPrice}</label>
              <Slider
                max={100}
                value={parseInt(gasPriceVal, 10)}
                onChange={(e, v) => {
                  this.gasPriceValChange(e, v)
                }}
                aria-labelledby="continuous-slider"
              />
            </div>
            <div className={styles.gdripInputWrap}>
              <TextField
                className={styles.inputText}
                label={I18N.Wallet.SendModal.gasPrice}
                value={gasPriceVal}
                onChange={e => {
                  this.gasPriceChange(e)
                }}
              />
              <span className={styles.unit}>{I18N.Wallet.SendModal.gdrip}</span>
            </div>
          </div>
          <Button
            variant="contained"
            disabled={sending}
            color="primary"
            className={styles.submitBtn}
            onClick={() => {
              this.submitForm()
            }}
          >
            {I18N.Wallet.SendModal.send}
          </Button>
        </div>
      </Dialog>
    )
  }
}
export default SendBaseModal
