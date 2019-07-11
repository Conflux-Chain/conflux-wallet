import React, { PureComponent } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface IProps {
  stepIndex: number
  uploadFile: () => void
  checkFile: () => void
  restorePasswordRight: boolean
  checkPassword: (password: string) => void
}

interface IState {
  password: string | number
}
export default class RestoreWallet extends PureComponent<IProps, IState> {
  state = {
    password: '',
  }

  changePassword = (e: any) => {
    this.setState({
      password: e.target.value,
    })
  }
  render() {
    const { stepIndex, uploadFile, checkFile, restorePasswordRight, checkPassword } = this.props
    const { password } = this.state
    return (
      <div className={styles.restoreWallet}>
        {!stepIndex ? (
          <div className={styles.container1}>
            <div className={styles.uploadBox} onClick={uploadFile}>
              <input className={styles.input} id="fileUpload" type="file" />
              <label htmlFor="fileUpload">
                <svg className={styles.uploadIc} aria-hidden="true">
                  <use xlinkHref="#iconwenjian-" />
                </svg>
              </label>
            </div>
            <p className={styles.tips}>
              Hello, you should upload your
              <br /> keystore file firstly.
            </p>
            <Button variant="contained" className={styles.loginButton} onClick={checkFile}>
              Continue
            </Button>
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
