import React, { Component } from 'react'
import { I18NProps } from '@/i18n/context'
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
interface IProps extends Partial<I18NProps> {
  isShow: boolean
  lockStatus?: boolean
  hasError?: boolean
  lockAction?: (val) => void
  onClose?: () => void
}
interface IState {
  password?: string
}
class LockWalletModal extends Component<IProps, IState> {
  state = {
    password: '',
  }
  handleClose() {
    this.props.onClose()
  }
  handleChange(event) {
    this.setState({
      password: event.target.value,
    })
  }
  submitForm() {
    this.props.lockAction({ password: this.state.password, callback: this.props.onClose })
  }
  render() {
    const { isShow, lockStatus, hasError, I18N } = this.props
    const { password } = this.state
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
            <h1 className={styles.dialogTitle}>
              {lockStatus ? I18N.Layout.LockWallet.dialogUnlock : I18N.Layout.LockWallet.dialogLock}
            </h1>
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
        <div className={styles.formContent}>
          <FormControl className={styles.formBox} error={hasError}>
            <InputLabel htmlFor="component-helper">
              {I18N.Layout.LockWallet.enterPassword}
            </InputLabel>
            <Input
              id="component-helper"
              value={password}
              onChange={e => {
                this.handleChange(e)
              }}
              aria-describedby="component-helper-text"
            />
            {hasError ? (
              <FormHelperText id="component-helper-text">
                {I18N.Layout.LockWallet.passwordTips}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={styles.submitBtn}
            onClick={() => {
              this.submitForm()
            }}
          >
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref={lockStatus ? '#iconsuo1' : '#iconlock'} />
            </svg>

            {lockStatus
              ? I18N.Layout.LockWallet.dialogUnlockBtn
              : I18N.Layout.LockWallet.dialogLockBtn}
          </Button>
        </div>
      </Dialog>
    )
  }
}
export default LockWalletModal
