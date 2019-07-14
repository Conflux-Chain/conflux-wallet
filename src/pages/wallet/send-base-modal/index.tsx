import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface ISubmitData {
  balanceVal: number
  addressVal: string
  gasPriceVal: string
}
interface IModalData {
  availableBalance: number
  successHash: string
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
}
class SendBaseModal extends Component<IProps, IState> {
  state = {
    balanceVal: 0,
    addressVal: '',
    gasPriceVal: '',
  }
  handleClose() {
    this.props.onClose()
  }
  balanceChange(event) {
    const val =
      event.target.value > this.props.modalData.availableBalance
        ? this.props.modalData.availableBalance
        : event.target.value
    this.setState({
      balanceVal: val,
    })
  }
  async transferAllAction() {
    await this.props.updateAction()
    this.setState({
      balanceVal: this.props.modalData.availableBalance,
    })
  }
  addressChange(event) {
    this.setState({
      addressVal: event.target.value,
    })
  }
  gasPriceChange(event) {
    this.setState({
      gasPriceVal: event.target.value,
    })
  }
  gasPriceValChange(event, newValue) {
    this.setState({
      gasPriceVal: newValue,
    })
  }
  submitForm() {
    if (!this.props.sending) {
      const { balanceVal, addressVal, gasPriceVal } = this.state
      this.props.sendAction({ balanceVal, addressVal, gasPriceVal })
    }
  }
  render() {
    const { isShow, unit, modalData, sendFailed: hasError, I18N } = this.props
    const { balanceVal, addressVal, gasPriceVal } = this.state
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
            <p>{modalData.successHash}</p>
          </div>
          <div className={styles.balanceWrap}>
            <div className={styles.balanceInput}>
              <FormControl className={styles.formBox}>
                <Input
                  placeholder={`The available balance is ${modalData.availableBalance}`}
                  value={balanceVal}
                  onChange={e => {
                    this.balanceChange(e)
                  }}
                  endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
                />
              </FormControl>
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
                placeholder="Address"
                value={addressVal}
                onChange={e => {
                  this.addressChange(e)
                }}
              />
              {hasError ? (
                <FormHelperText className={styles.formErrorText}>
                  Please enter the right address!
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
              <FormControl className={styles.formBox}>
                <Input
                  placeholder={I18N.Wallet.SendModal.gasPrice}
                  value={gasPriceVal}
                  onChange={e => {
                    this.gasPriceChange(e)
                  }}
                  endAdornment={
                    <InputAdornment position="end">{I18N.Wallet.SendModal.gdrip}</InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
          <Button
            variant="contained"
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
