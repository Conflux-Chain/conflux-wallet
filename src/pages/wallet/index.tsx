import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
import { namespace as globalCommonNamespace } from '@/models/global/common'
import { connect } from 'react-redux'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Paper from '@material-ui/core/Paper'
import ContentCfx from './content-cfx/index'
import ContentFc from './content-fc/index'
import { IDispatch } from '@/typings'
import { namespace } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { IDvaProps } from './typings'
interface IProps extends IDvaProps, I18NProps, IDispatch {
  lockStatus?: boolean
  testState: number
}
class Home extends Component<IProps> {
  componentDidMount() {
    this.updateCfxAction()
    this.updateFcAction()
  }

  // ******* cfx
  // 发送cfx
  onSendCfx(data) {
    this.props.dispatch({
      type: `${namespace}/send`,
      payload: data,
    })
  }
  // 更新cfx
  updateCfxAction() {
    this.props.dispatch({
      type: `${namespace}/updateCfxBalance`,
    })
  }
  // 关闭cfx失败
  closeCfxFailedModal() {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: { cfxSendFailed: false },
    })
  }
  // 关闭cfx成功模态框
  closeCfxSuccessedModal() {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: { cfxSendSuccessed: false },
    })
  }
  // ******* fc
  // 发送fc
  onSendFc(data) {
    this.props.dispatch({
      type: `${namespaceOfFc}/send`,
      payload: data,
    })
  }
  // 更新fc
  updateFcAction() {
    this.props.dispatch({
      type: `${namespaceOfFc}/updateFCBalance`,
    })
  }
  // 关闭fc失败
  closeFcFailedModal() {
    this.props.dispatch({
      type: `${namespaceOfFc}/setState`,
      payload: { fcSendFailed: false },
    })
  }
  // 关闭fc成功模态框
  closeFcSuccessedModal() {
    this.props.dispatch({
      type: `${namespace}/setState`,
      payload: { fcSendSuccessed: false },
    })
  }
  render() {
    return (
      <div>
        <h2 className={styles.pageTitle}>My Wallet</h2>
        <p className={styles.pageTips}>Explore, enjoy, embrace Conflux world</p>
        <div className={styles.cardWrap}>
          <Paper className={styles.pageCard}>
            <ContentCfx
              {...this.props}
              updateCfxAction={() => {
                this.updateCfxAction()
              }}
              closeFailedModal={() => {
                this.closeCfxFailedModal()
              }}
              closeSuccessedModal={() => {
                this.closeCfxSuccessedModal()
              }}
              onSendCfx={sendData => {
                this.onSendCfx(sendData)
              }}
            />
          </Paper>
          <Paper className={classnames(styles.pageCard, styles.cardFC)}>
            <ContentFc
              {...this.props}
              updateFcAction={() => {
                this.updateFcAction()
              }}
              closeFailedModal={() => {
                this.closeFcFailedModal()
              }}
              closeSuccessedModal={() => {
                this.closeFcSuccessedModal()
              }}
              onSendFc={sendData => {
                this.onSendFc(sendData)
              }}
            />
          </Paper>
        </div>
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
    ...models[namespaceOfFc],
    ...models[globalCommonNamespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Home))
