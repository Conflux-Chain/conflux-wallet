import React, { PureComponent } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { createAndDownloadFile } from '@/utils/tools'

interface IProps {
  stepIndex: number
  generateKeystore: (password: string) => void
  downloadFile: () => void // keystore文件下载
  downloadSuc: boolean // 下载是否成功
  keystoreJson?: ''
}

interface IState {
  password: string
  tipsShow: boolean
}
export default class CreatWallet extends PureComponent<IProps, IState> {
  state = {
    password: '',
    tipsShow: false,
  }
  changePassword = (e: any) => {
    this.setState({
      password: e.target.value,
    })
  }
  toogleTips = () => {
    const { tipsShow } = this.state
    this.setState({
      tipsShow: !tipsShow,
    })
  }
  downloadFile = () => {
    // 下载文件的demo，只需要传入keystore内容就行
    createAndDownloadFile('keystore', JSON.stringify(this.props.keystoreJson))
    // TODO:下载成功回调函数
  }
  render() {
    const { password, tipsShow } = this.state
    const { stepIndex, generateKeystore, downloadSuc } = this.props
    const tipsArr = [
      {
        iconName: 'iconfileprotectwenjianbaohu',
        title: 'Don’t Lose It',
        content: 'Be careful, it can not be recovered if you lose it',
      },
      {
        iconName: 'iconicons-hacker',
        title: 'Don’t Share It',
        content: 'Your funds will be stollen if you use this file on a malicious phishing site.',
      },
      {
        iconName: 'iconbeifen',
        title: 'Make a Backup',
        content: 'Secure it like the millions of dollars it may one day be worth.',
      },
    ]
    return (
      <div className={styles.creatWallet}>
        {downloadSuc ? (
          <div className={styles.sucBox}>
            <svg className={styles.rightIc} aria-hidden="true">
              <use xlinkHref="#iconchenggong1" />
            </svg>
            <p className={styles.sucTxt}>You have created a wallet successfully!</p>
            <Button
              variant="contained"
              className={styles.loginButton}
              style={{ width: '181px', height: '40px' }}
              onClick={() => generateKeystore(password)}
            >
              Access My Wallet
            </Button>
          </div>
        ) : !stepIndex ? (
          <div className={styles.container1}>
            <div className={styles.passWordLine}>
              <TextField
                id="input-adornment-password"
                className={styles.txt}
                variant="standard"
                type="password"
                label="Your Password"
                value={password}
                onChange={this.changePassword}
                placeholder="Please Enter At Least 9 Characters"
              />
              <svg className={styles.qsIc} aria-hidden="true" onClick={this.toogleTips}>
                <use xlinkHref="#iconjieshi" />
              </svg>
              {tipsShow && (
                <SnackbarContent
                  className={styles.snackBar}
                  message={
                    'This password encrypts your private key. \
                    This does not act as a seed to generate your keys.'
                  }
                />
              )}
            </div>
            <Button
              variant="contained"
              disabled={!password.length}
              className={styles.loginButton}
              style={{ backgroundColor: password.length ? '#1E3DE4' : 'rgba(0,0,0,0.38)' }}
              onClick={() => generateKeystore(password)}
            >
              Continue
            </Button>
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
            <Button
              variant="contained"
              className={styles.loginButton}
              style={{ width: '227px' }}
              onClick={this.downloadFile}
            >
              Download Keystore File
            </Button>
          </div>
        )}
      </div>
    )
  }
}
