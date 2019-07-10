import React, { Component } from 'react'
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
interface IProps {
  isShow: boolean
  onClose?: () => void
}
interface IState {
  password?: string
  hasError?: boolean
}
class SendBaseModal extends Component<IProps, IState> {
  state = {
    password: '',
    hasError: false,
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
    this.setState({
      hasError: true,
    })
  }
  render() {
    const { isShow } = this.props
    const { password, hasError } = this.state
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
            <h1 className={styles.dialogTitle}>Lock Wallet</h1>
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
            <InputLabel htmlFor="component-helper">Please enter your password</InputLabel>
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
                Please enter the right password!
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
              <use xlinkHref="#iconlock" />
            </svg>
            Unlock
          </Button>
        </div>
      </Dialog>
    )
  }
}
export default SendBaseModal
