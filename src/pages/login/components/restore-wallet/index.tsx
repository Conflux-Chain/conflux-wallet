import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { I18NProps } from '@/i18n/context'

interface IProps extends Partial<I18NProps> {
  stepIndex: number
  uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  restorePasswordRight: boolean
  checkPassword: (password: string) => void
  setStep: (step: number) => void
}

interface IState {
  password: string | number
}
export default class RestoreWallet extends Component<IProps, IState> {
  state = {
    password: '',
  }

  changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    })
  }

  render() {
    const { stepIndex, uploadFile, restorePasswordRight, checkPassword } = this.props
    const { password } = this.state
    return (
      <div className={styles.restoreWallet}>
        {!stepIndex ? (
          <div className={styles.container1}>
            <div className={styles.uploadBox}>
              <svg className={styles.uploadIc} aria-hidden="true">
                <use xlinkHref="#iconwenjian-" />
              </svg>
            </div>
            <p className={styles.tips}>
              Hello, you should upload your
              <br /> keystore file firstly.
            </p>
            <input
              className={styles.input}
              onChange={(e: any) => uploadFile(e)}
              id="fileUpload"
              type="file"
            />
            <label htmlFor="fileUpload">
              <Button variant="contained" component="span" className={styles.loginButton}>
                Continue
              </Button>
            </label>
          </div>
        ) : (
          <div className={styles.container2}>
            <TextField
              id="input-adornment-password"
              variant="standard"
              type="password"
              label="Password"
              value={password}
              onChange={this.changePassword}
              error={!restorePasswordRight}
            />
            {!restorePasswordRight && (
              <p className={styles.errorTxt}>Please enter the right password!</p>
            )}
            <Button
              variant="contained"
              disabled={!password.length}
              className={styles.loginButton}
              onClick={() => checkPassword(password)}
            >
              Access Wallet
            </Button>
          </div>
        )}
      </div>
    )
  }
}
