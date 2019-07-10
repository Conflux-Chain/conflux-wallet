// 登录模块modal外框
import React, { Component } from 'react'
import { styled } from '@material-ui/styles'
import classnames from 'classnames'
import styles from './style.module.scss'
import Modal from '@material-ui/core/Modal'
import RestoreWallet from '../restore-wallet'
import CreatWallet from '../creat-wallet'

const Mycontainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

interface IProps {
  open: boolean // 模态框是否开启
  onClose: () => void // 关闭方法
  type: string // 模态框类型： 'creat'为新建钱包，'restore'为重置钱包
  stepIndex: number // 当前步骤
  uploadFile: () => void // 重置钱包上传密钥文件
  checkFile: () => void // 验证keystore文件是否正确
  restoreFileRight: boolean // 上传密钥文件是否正确
  restorePasswordRight: boolean // 密码是否正确
  colseError: () => void // 关闭错误提示框
  checkPassword: (password: string) => void // 验证密码是否正确
  generateKeystore: (password: string) => void // 根据密码生成keystore文件
  downloadFile: () => void // keystore文件下载
  downloadSuc: boolean // 下载是否成功
}

export default class ModalLogin extends Component<IProps> {
  render() {
    const {
      open,
      onClose,
      type,
      stepIndex,
      uploadFile,
      checkFile,
      restoreFileRight,
      restorePasswordRight,
      colseError,
      checkPassword,
      generateKeystore,
      downloadFile,
      downloadSuc,
    } = this.props
    const stepArr = [1, 2]
    return (
      <Modal open={open} onClose={onClose} className={styles.creatModal}>
        <Mycontainer>
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
                downloadFile={downloadFile}
                downloadSuc={downloadSuc}
              />
            ) : (
              <RestoreWallet
                stepIndex={stepIndex}
                uploadFile={uploadFile}
                checkFile={checkFile}
                restorePasswordRight={restorePasswordRight}
                checkPassword={checkPassword}
              />
            )}
          </div>
          <div className={styles.bottomInfo}>
            {!downloadSuc && (
              <p className={styles.words}>
                If you {type === 'restore' ? 'have no' : 'already have an'}account, please
                <span className={styles.linkName}>
                  {type === 'restore' ? 'Creat' : 'Restore'} Wallet
                </span>
                >>
              </p>
            )}
            {!restoreFileRight && (
              <div className={styles.errorBox}>
                <svg className={styles.leftIc} aria-hidden="true" onClick={colseError}>
                  <use xlinkHref="#iconwrong" />
                </svg>
                <p className={styles.errorInfo}>JSON Parse error: “Unrecognize token”</p>
                <svg className={styles.rightIc} aria-hidden="true" onClick={colseError}>
                  <use xlinkHref="#iconclose" />
                </svg>
              </div>
            )}
          </div>
        </Mycontainer>
      </Modal>
    )
  }
}
