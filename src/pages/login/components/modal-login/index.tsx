// 登录模块modal外框
import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import Modal from '@material-ui/core/Modal'
import { I18NProps } from '@/i18n/context'
import RestoreWallet from '../restore-wallet'
import CreatWallet from '../creat-wallet'
import { IDispatch } from '@/models/connect'

interface ICreat {
  generateKeystore: (password: string) => void // 根据密码生成keystore文件
  goWallet: () => void
  keystoreJson: any
}

interface IRestore {
  uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void // 重置钱包上传密钥文件
  restoreFileRight: boolean // 上传密钥文件是否正确
  restorePasswordRight: boolean // 密码是否正确
  colseError: () => void // 关闭错误提示框
  checkPassword: (password: string) => void // 验证密码是否正确
}

type IDvaProps = IDispatch & I18NProps & ICreat & IRestore

interface IProps extends Partial<IDvaProps> {
  open: boolean // 模态框是否开启
  onClose: () => void // 关闭方法
  type: string // 模态框类型： 'creat'为新建钱包，'restore'为重置钱包
  stepIndex: number // 当前步骤
  setType: (type: string) => void
  setStep: (step: number) => void
}

interface IState {
  downloadSuc: boolean
}

export default class ModalLogin extends Component<IProps, IState> {
  state = {
    downloadSuc: false,
  }
  setDownload = () => {
    this.setState({
      downloadSuc: true,
    })
  }
  setType = (type: string) => {
    this.props.setType(type)
  }
  render() {
    const {
      open,
      onClose,
      type,
      stepIndex,
      uploadFile,
      restoreFileRight,
      restorePasswordRight,
      colseError,
      checkPassword,
      generateKeystore,
      goWallet,
      keystoreJson,
      setStep,
      I18N,
    } = this.props
    const { downloadSuc } = this.state
    const stepArr = [1, 2]
    return (
      <Modal open={open} onClose={onClose} className={styles.creatModal}>
        <div className={styles.myContainer}>
          <div className={styles.container}>
            {!downloadSuc && (
              <div className={styles.dotBox}>
                {stepArr.map((_, index) => (
                  <div
                    key={`dot${index}`}
                    className={
                      stepIndex === index
                        ? classnames(styles.dotItem, styles.dotItemAc)
                        : styles.dotItem
                    }
                  />
                ))}
              </div>
            )}
            {type === 'creat' ? (
              <CreatWallet
                stepIndex={stepIndex}
                generateKeystore={generateKeystore}
                goWallet={goWallet}
                keystoreJson={keystoreJson}
                setDownload={this.setDownload}
                I18N={I18N}
              />
            ) : (
              <RestoreWallet
                stepIndex={stepIndex}
                uploadFile={uploadFile}
                restorePasswordRight={restorePasswordRight}
                checkPassword={checkPassword}
                setStep={setStep}
                I18N={I18N}
              />
            )}
          </div>
          <div className={styles.bottomInfo}>
            {!downloadSuc &&
              (type === 'restore' ? (
                <p className={styles.words}>
                  {I18N.Login.modalLogin.creat}
                  <span className={styles.linkName} onClick={() => this.setType('creat')}>
                    {I18N.Login.LoginIndex.titleCreat}
                  </span>
                  >>
                </p>
              ) : (
                <p className={styles.words}>
                  {I18N.Login.modalLogin.restore}
                  <span className={styles.linkName} onClick={() => this.setType('restore')}>
                    {I18N.Login.LoginIndex.titleRestore}
                  </span>
                  >>
                </p>
              ))}
            {!restoreFileRight && (
              <div className={styles.errorBox}>
                <svg className={styles.leftIc} aria-hidden="true" onClick={colseError}>
                  <use xlinkHref="#iconwrong" />
                </svg>
                <p className={styles.errorInfo}>{I18N.Login.modalLogin.errorInfo}</p>
                <svg className={styles.rightIc} aria-hidden="true" onClick={colseError}>
                  <use xlinkHref="#iconclose" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Modal>
    )
  }
}
