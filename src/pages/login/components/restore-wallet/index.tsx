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
  pasteKeystore: (keystore: string) => void
}

interface IState {
  password: string | number
  keystore: string
}
export default class RestoreWallet extends Component<IProps, IState> {
  state = {
    password: '',
    keystore: '',
  }

  changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    })
  }
  changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      keystore: e.target.value,
    })
  }

  render() {
    const {
      stepIndex,
      uploadFile,
      restorePasswordRight,
      checkPassword,
      pasteKeystore,
      I18N,
    } = this.props
    const { password, keystore } = this.state
    return (
      <div className={styles.restoreWallet}>
        {!stepIndex ? (
          <div className={styles.container1}>
            <div className={styles.uploadBox}>
              <svg className={styles.uploadIc} aria-hidden="true">
                <use xlinkHref="#iconwenjian-" />
              </svg>
            </div>
            <p className={styles.tips}>{I18N.Login.restoreWallet.upload}</p>
            <div className={styles.PCBox}>
              <input
                className={styles.input}
                onChange={(e: any) => uploadFile(e)}
                id="fileUpload"
                type="file"
              />
              <label htmlFor="fileUpload">
                <div className={styles.loginButtonBox}>
                  <Button variant="contained" component="span" className={styles.loginButton}>
                    {I18N.Login.LoginIndex.continue}
                  </Button>
                </div>
              </label>
            </div>
            <div className={styles.mobileBox}>
              <textarea
                rows={4}
                className={styles.text}
                onChange={(e: any) => this.changeKeyword(e)}
              />
              <div className={styles.loginButtonBox}>
                <Button
                  variant="contained"
                  component="span"
                  className={styles.loginButton}
                  onClick={() => pasteKeystore(keystore)}
                >
                  {I18N.Login.LoginIndex.continue}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.container2}>
            <TextField
              id="input-adornment-password"
              variant="standard"
              type="password"
              label={I18N.Login.restoreWallet.passLabel}
              value={password}
              onChange={this.changePassword}
              error={!restorePasswordRight}
            />
            {!restorePasswordRight && (
              <p className={styles.errorTxt}>{I18N.Login.restoreWallet.passTips}</p>
            )}
            <div className={styles.loginButtonBox}>
              <Button
                variant="contained"
                disabled={!password.length}
                className={styles.loginButton}
                onClick={() => checkPassword(password)}
              >
                {I18N.Login.restoreWallet.accessWallet}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
