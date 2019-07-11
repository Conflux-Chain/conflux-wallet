import React, { Component } from 'react'
// import Slider from '@material-ui/core/Slider'
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
interface IProps {
  isShow: boolean
  unit: string
  onClose?: () => void
}
interface IState {
  balanceVal?: string
  addressVal?: string
  gasPriceVal?: string
  hasError?: boolean
}
class SendBaseModal extends Component<IProps, IState> {
  state = {
    balanceVal: '',
    addressVal: '',
    gasPriceVal: '',
    hasError: false,
  }
  handleClose() {
    this.props.onClose()
  }
  balanceChange(event) {
    this.setState({
      balanceVal: event.target.value,
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
  submitForm() {
    this.setState({
      hasError: true,
    })
  }
  render() {
    const { isShow, unit } = this.props

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
            <h1 className={styles.dialogTitle}>Send Transaction</h1>
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
            <label className={styles.fromLabel}>From</label>
            <p>0xa70ddf9b9750c575db453eea6a041f4c8536785a</p>
          </div>
          <div className={styles.balanceWrap}>
            <div className={styles.balanceInput}>
              <FormControl className={styles.formBox}>
                <Input
                  placeholder="The available balance is 10,000"
                  value={balanceVal}
                  onChange={e => {
                    this.balanceChange(e)
                  }}
                  endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
                />
              </FormControl>
            </div>
            <div className={styles.balanceTransferAll}>
              <Button color="primary" className={styles.balanceTransferAllText}>
                Transfer all the balance
              </Button>
            </div>
          </div>
          <div className={styles.addressWrap}>
            <FormControl className={styles.formBox} error={hasError}>
              <InputLabel>To Address</InputLabel>
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
              <label className={styles.fromLabel}>Gas Price</label>
              <div>123</div>
              {/* <Slider
                value={gasPriceVal}
                onChange={(e, v) => {
                  this.gasPriceValChange(e, v)
                }}
                aria-labelledby="continuous-slider"
              /> */}
            </div>
            <div className={styles.gdripInputWrap}>
              <FormControl className={styles.formBox}>
                <Input
                  placeholder="Gas Price"
                  value={gasPriceVal}
                  onChange={e => {
                    this.gasPriceChange(e)
                  }}
                  endAdornment={<InputAdornment position="end">Gdrip</InputAdornment>}
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
            Send
          </Button>
        </div>
      </Dialog>
    )
  }
}
export default SendBaseModal
