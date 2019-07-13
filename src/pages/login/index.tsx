import React, { Component } from 'react'
import styles from './style.module.scss'
import { namespace } from '@/models/login'
import { namespace as namespaceOfCommon } from '@/models/global/common'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import { readFileContentByFileObj } from '@/utils/tools'
import ModalLogin from './components/modal-login'
import imgs from '@/assets/images'

type IProps = IDispatch &
  I18NProps & {
    keystoreJson: any
    restorePasswordRight: boolean
  }

interface IState {
  open: boolean
  type: string
  stepIndex: number
  restoreFileRight: boolean
  fileContent: any
}

class Login extends Component<IProps, IState> {
  state = {
    open: false, // 模态框显隐
    type: 'creat', // 显示类型
    stepIndex: 0, // 当前步骤
    restoreFileRight: true, // 密钥文件验证是否正确
    fileContent: '', // 上传密钥文件获取到的数据
  }
  // 模态框显隐
  toogleModal = (type: string = 'creat') => {
    const { open } = this.state
    this.setState({
      type,
      open: !open,
      stepIndex: 0,
      restoreFileRight: true,
    })
    if (type === 'restore') {
      this.props.dispatch({
        type: `${namespace}/setState`,
        payload: {
          restorePasswordRight: true,
        },
      })
    }
  }
  // 上传登录密钥文件
  uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files
      // 读取文件demo
      const fileContent = await readFileContentByFileObj(file[0])
      // console.log(JSON.parse(fileContent))
      // 读取成功后的操作
      this.setState({
        fileContent,
        stepIndex: 1,
        restoreFileRight: true,
      })
    } catch {
      // 文件解析失败
      this.setState({
        restoreFileRight: false,
      })
    }
  }

  // 关闭错误信息提示框
  colseError = () => {
    this.setState({
      restoreFileRight: true,
    })
  }

  // 密码验证
  checkPassword = (password: string) => {
    const { fileContent } = this.state
    this.props.dispatch({
      type: `${namespace}/login`,
      payload: {
        password,
        keystoreJson: fileContent,
      },
      callback: () => {
        // 验证通过
        this.setState({
          open: false,
        })
      },
    })
  }

  // 根据密码生成keystore文件
  generateKeystore = (password: string) => {
    this.props.dispatch({
      type: `${namespace}/create`,
      payload: {
        password,
      },
      callback: () => {
        // 生成成功
        this.setState({
          stepIndex: 1,
        })
      },
    })
  }

  // access wallt
  goWallet = () => {
    // 更新login状态
    this.props.dispatch({
      type: `${namespaceOfCommon}/setState`,
      payload: {
        isLogin: true,
      },
    })
  }

  setType = (type: string) => {
    this.setState({
      type,
      stepIndex: 0,
    })
  }

  setStep = (step: number) => {
    this.setState({
      stepIndex: step,
    })
  }

  render() {
    const { open, type, stepIndex, restoreFileRight } = this.state
    const { keystoreJson, restorePasswordRight, I18N } = this.props
    return (
      <div className={styles.login}>
        <h2 className={styles.title}>{I18N.Login.LoginIndex.titleH1}</h2>
        <div className={styles.conBox}>
          <Paper className={styles.paper} onClick={() => this.toogleModal('restore')}>
            <Hidden only={['xs', 'sm']}>
              <img src={imgs.restorePng} className={styles.cardIc} />
            </Hidden>
            <h5 className={styles.paperTitle}>{I18N.Login.LoginIndex.titleRestore}</h5>
            <p className={styles.paperDesc}>{I18N.Login.LoginIndex.conRestore}</p>
          </Paper>
          <Paper className={styles.paper} onClick={() => this.toogleModal('creat')}>
            <Hidden only={['xs', 'sm']}>
              <img src={imgs.creatPng} className={styles.cardIc} />
            </Hidden>
            <h5 className={styles.paperTitle}>{I18N.Login.LoginIndex.titleCreat}</h5>
            <p className={styles.paperDesc}>{I18N.Login.LoginIndex.conCreat}</p>
          </Paper>
        </div>
        <ModalLogin
          open={open}
          type={type}
          onClose={this.toogleModal}
          stepIndex={stepIndex}
          uploadFile={this.uploadFile}
          restoreFileRight={restoreFileRight}
          restorePasswordRight={restorePasswordRight}
          colseError={this.colseError}
          checkPassword={this.checkPassword}
          generateKeystore={this.generateKeystore}
          keystoreJson={keystoreJson}
          setType={this.setType}
          setStep={this.setStep}
          I18N={I18N}
          goWallet={this.goWallet}
        />
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
    ...models[namespaceOfCommon],
  }
}
export default connect(mapStateToProps)(I18NHOC(Login))
