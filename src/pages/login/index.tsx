import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import { namespace } from '@/models/home'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import ModalLogin from './components/modal-login'

type IProps = IDispatch &
  I18NProps & {
    testState: number
  }

interface IState {
  open: boolean
  type: string
  stepIndex: number
  restoreFileRight: boolean
  restorePasswordRight: boolean
  downloadSuc: boolean
}

class Login extends Component<IProps, IState> {
  state = {
    open: false, // 模态框显隐
    type: 'creat', // 显示类型
    stepIndex: 0, // 当前步骤
    restoreFileRight: true, // 密钥文件验证是否正确
    restorePasswordRight: true, // 重置钱包密码是否正确
    downloadSuc: false, // keystore文件下载是否成功
  }
  // 模态框显隐
  toogleModal = (type: string = 'creat') => {
    const { open } = this.state
    this.setState({
      type,
      open: !open,
      stepIndex: 0,
      restoreFileRight: true,
      restorePasswordRight: true,
      downloadSuc: false,
    })
  }
  // 上传登录密钥文件
  uploadFile = () => {}

  // 密钥文件验证
  checkFile = () => {
    // 验证正确
    this.setState({
      stepIndex: 1,
      restoreFileRight: true,
    })

    // 验证错误
    // this.setState({
    //   restoreFileRight: false,
    // })
  }

  // 关闭错误信息提示框
  colseError = () => {
    this.setState({
      restoreFileRight: true,
    })
  }

  // 密码验证
  checkPassword = (password: string) => {
    // console.log(password)
    // 验证通过,进入钱包，保存登录状态
    // this.setState({
    //   open: false,
    // })
    // 密码错误
    this.setState({
      restorePasswordRight: false,
    })
  }

  // 根据密码生成keystore文件
  generateKeystore = (password: string) => {
    // 生成成功
    this.setState({
      stepIndex: 1,
    })
  }

  // 下载keystore文件
  downloadFile = () => {
    // 下载成功
    this.setState({
      downloadSuc: true,
    })
  }

  render() {
    const {
      open,
      type,
      stepIndex,
      restoreFileRight,
      restorePasswordRight,
      downloadSuc,
    } = this.state
    return (
      <div className={styles.login}>
        <Container>
          <h2 className={styles.title}>Welcome to Conflux Wallet</h2>
          <div className={styles.conBox}>
            <Paper className={styles.paper} onClick={() => this.toogleModal('restore')}>
              <svg className={classnames(styles.nowIcon, styles.icon1)} aria-hidden="true">
                <use xlinkHref="#iconwenjian" />
              </svg>
              <h5 className={styles.paperTitle}>Restore Wallet</h5>
              <p className={styles.paperDesc}>If you have an account, please restore your wallet</p>
            </Paper>
            <Paper className={styles.paper} onClick={() => this.toogleModal('creat')}>
              <svg className={classnames(styles.nowIcon, styles.icon2)} aria-hidden="true">
                <use xlinkHref="#iconxinjian" />
              </svg>
              <h5 className={styles.paperTitle}>Create Wallet</h5>
              <p className={styles.paperDesc}>If you have no account, please create wall</p>
            </Paper>
          </div>
        </Container>
        {/* <RestoreModal open={restoreModal} onClose={this.toogleRestore} />
        <CreatModal open={creatModal} onClose={this.toogleCreat} /> */}
        <ModalLogin
          open={open}
          type={type}
          onClose={this.toogleModal}
          stepIndex={stepIndex}
          uploadFile={this.uploadFile}
          checkFile={this.checkFile}
          restoreFileRight={restoreFileRight}
          restorePasswordRight={restorePasswordRight}
          colseError={this.colseError}
          checkPassword={this.checkPassword}
          generateKeystore={this.generateKeystore}
          downloadSuc={downloadSuc}
          downloadFile={this.downloadFile}
        />
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Login))
