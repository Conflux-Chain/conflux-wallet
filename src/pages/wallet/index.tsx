import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
// import { namespace } from '@/models/home'
import { namespace as globalCommonNamespace } from '@/models/global/common'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Paper from '@material-ui/core/Paper'
import ContentCfx from './content-cfx/index'
import ContentFc from './content-fc/index'

import { namespace } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
/**
 * cfx相关props
 */
interface ICFX {
  /**当前登陆的账户地址 */
  currentAccountAddress: ''
  /**当前登陆的private key*/
  currentAccountPrivateKey: ''
  /** cfx余额 */
  cfxBalance: ''
  /**最新转账成功的hash */
  lastCfxSendSuccessHash: ''
  /** cfx开始send */
  cfxSending: false
  /** cfx send成功 */
  cfxSendSuccessed: false
  /** cfx send失败 */
  cfxSendFailed: false
}
/**
 * fc相关props
 */
interface IFC {
  /** 总数 */
  fcTotalBalance: 0
  /** 可用数量 = fcPersonalFreeBalance+fcPersonalUnLockBalance */
  fcAvailableBalance: 0
  /** Conflux转账池可用balance*/
  fcPersonalFreeBalance: 0
  /** 个人转账池 = 通过fc数值计算得来 */
  fcPersonalUnLockBalance: 0
  /** 个人锁定池的FC数量 通过stateOf函数直接获取 */
  fcPersonalLockBalance: 0
  // ======send=======
  /** fc 开始send */
  fcSending: false
  /** fc send成功 */
  fcSendSuccessed: false
  /** fc send失败 */
  fcSendFailed: false
  /**最新转账成功的hash */
  lastFCSendSuccessHash: ''
}
type IDvaProps = IDispatch & ICFX & IFC
type IProps = IDvaProps &
  I18NProps & {
    lockStatus?: boolean
    testState: number
  }
class Home extends Component<IProps> {
  render() {
    const { lockStatus } = this.props

    return (
      <div>
        <h2 className={styles.pageTitle}>Your Wallet</h2>
        <p className={styles.pageTips}>
          Get the best prices without having to leave the security of your Wallet.
        </p>
        <div className={styles.cardWrap}>
          <Paper className={styles.pageCard}>
            <ContentCfx lockStatus={lockStatus} />
          </Paper>
          <Paper className={classnames(styles.pageCard, styles.cardFC)}>
            <ContentFc lockStatus={lockStatus} />
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
