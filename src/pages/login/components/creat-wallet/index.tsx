import React, { Component } from 'react'
import classnames from 'classnames'
import copy from 'copy-to-clipboard'
import { I18NProps } from '@/i18n/context'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { createAndDownloadFile } from '@/utils/tools'
import styles from './style.module.scss'

interface IProps extends Partial<I18NProps> {
  stepIndex: number
  generateKeystore: (password: string) => void
  goWallet: () => void
  setDownload: () => void
  keystoreJson?: any
}

interface IState {
  password: string
  tipsShow: boolean
  downloadSuc: boolean // 下载是否成功
  passwordStrength: number // 密码强度
  copySuc: boolean // 秘钥复制是否成功
}
export default class CreatWallet extends Component<IProps, IState> {
  state = {
    password: '',
    tipsShow: false,
    downloadSuc: false,
    copySuc: false,
    passwordStrength: 0, // 小写字母、数字、大写字母、特殊符号包含一种为'weak'，两种为‘middle‘，三种及以上为‘good'
  }
  changePassword = (e: any) => {
    const { value } = e.target
    if (value.length > 8) {
      // 密码长度至少为9位
      // 密码强度验证
      let typeLen = 0
      // 是否包含小写字母
      if (/[a-z]/.test(value)) {
        typeLen++
      }
      // 是否包含大写字母
      if (/[A-Z]/.test(value)) {
        typeLen++
      }
      // 是否包含数字
      if (/\d/.test(value)) {
        typeLen++
      }
      // 是否包含特殊字符
      if (/\W/.test(value)) {
        typeLen++
      }
      this.setState({
        password: value,
        passwordStrength: typeLen,
      })
    } else {
      this.setState({
        password: value,
      })
    }
  }
  toogleTips = () => {
    const { tipsShow } = this.state
    this.setState({
      tipsShow: !tipsShow,
    })
  }
  openTips = () => {
    this.setState({
      tipsShow: true,
    })
  }
  closeTips = () => {
    this.setState({
      tipsShow: false,
    })
  }
  downloadFile = () => {
    // 下载文件的demo，只需要传入keystore内容就行
    createAndDownloadFile('keystore', JSON.stringify(this.props.keystoreJson))
    // 下载成功回调函数
    this.setState({
      downloadSuc: true,
    })
    this.props.setDownload()
  }
  copyKeystore = () => {
    const res = copy(JSON.stringify(this.props.keystoreJson))
    if (res) {
      this.setState(
        {
          downloadSuc: true,
          copySuc: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              copySuc: false,
            })
          }, 3000)
        }
      )
      this.props.setDownload()
    }
  }
  render() {
    const { password, tipsShow, downloadSuc, copySuc, passwordStrength } = this.state
    const { stepIndex, generateKeystore, goWallet, I18N, keystoreJson } = this.props
    const tipsArr = I18N.Login.createWallet.tipsArr
    return (
      <div className={styles.creatWallet}>
        {downloadSuc ? (
          <div className={styles.sucBox}>
            {copySuc && <div className={styles.copySuc}>{I18N.Login.createWallet.copy}</div>}
            <svg className={styles.rightIc} aria-hidden="true">
              <use xlinkHref="#iconchenggong1" />
            </svg>
            <p className={styles.sucTxt}>{I18N.Login.createWallet.creatSuc}</p>
            <div className={styles.loginButtonBox} style={{ width: '181px', height: '40px' }}>
              <Button variant="contained" className={styles.loginButton} onClick={goWallet}>
                {I18N.Login.createWallet.goWallet}
              </Button>
            </div>
          </div>
        ) : !stepIndex ? (
          <div className={styles.container1}>
            <div className={styles.passWordLine}>
              <TextField
                id="input-adornment-password"
                className={styles.txt}
                variant="standard"
                type="password"
                label={I18N.Login.createWallet.passLabel}
                value={password}
                onChange={this.changePassword}
                placeholder={I18N.Login.createWallet.passPlace}
              />
              <svg
                className={tipsShow ? classnames(styles.qsIc, styles.qsIcAc) : styles.qsIc}
                aria-hidden="true"
                onTouchStart={this.toogleTips}
                onTouchEnd={this.toogleTips}
                onMouseOver={this.openTips}
                onMouseLeave={this.closeTips}
              >
                <use xlinkHref="#iconjieshi" />
              </svg>
              {tipsShow && (
                <SnackbarContent
                  className={styles.snackBar}
                  message={I18N.Login.createWallet.tips}
                />
              )}
            </div>
            {password.length > 8 && (
              <p className={styles.passStrength}>
                {I18N.Login.createWallet.passwordStrength}
                <span
                  style={{
                    color: passwordStrength === 0 || passwordStrength === 1 ? '#C31212' : '#10D182',
                  }}
                >
                  {passwordStrength === 1 || passwordStrength === 0
                    ? I18N.Login.createWallet.weak
                    : passwordStrength === 2
                    ? I18N.Login.createWallet.middle
                    : I18N.Login.createWallet.good}
                </span>
              </p>
            )}
            <div className={styles.loginButtonBox}>
              <Button
                variant="contained"
                disabled={password.length < 9}
                className={styles.loginButton}
                style={{ backgroundColor: password.length < 9 ? 'rgba(0,0,0,0.38)' : '#1E3DE4' }}
                onClick={() => generateKeystore(password)}
              >
                {I18N.Login.LoginIndex.continue}
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.container2}>
            <div className={styles.conBox}>
              {tipsArr.map((item, index) => (
                <div className={styles.conItem} key={`tips${index}`}>
                  <div className={styles.imgBox}>
                    <svg className={styles.conIc} aria-hidden="true">
                      <use xlinkHref={`#${item.iconName}`} />
                    </svg>
                  </div>
                  <div className={styles.txtBox}>
                    <p className={styles.txt1}>{item.title}</p>
                    <p className={styles.txt2}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.mobileBox}>
              <div className={styles.keystoreBox}>{JSON.stringify(keystoreJson)}</div>
              <div className={styles.loginButtonBox} style={{ width: '227px' }}>
                <Button
                  variant="contained"
                  className={styles.loginButton}
                  onClick={this.copyKeystore}
                >
                  {I18N.Login.createWallet.copyKeystore}
                </Button>
              </div>
            </div>
            <div
              className={classnames(styles.loginButtonBox, styles.PCBox)}
              style={{ width: '227px' }}
            >
              <Button
                variant="contained"
                className={styles.loginButton}
                onClick={this.downloadFile}
              >
                {I18N.Login.createWallet.downloadFile}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
