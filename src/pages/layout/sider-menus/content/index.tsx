import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import OperationCode from './operation-code/index'
import OperationDaochu from './operation-daochu/index'
import OperationFuzhi from './operation-fuzhi/index'
import OperationRecord from './operation-record/index'
import MenuList from './menu-list/index'
import { namespace } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { IDispatch } from '@/models/connect'
import { connect } from 'react-redux'
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
  /** cfx开始send */
  cfxSending: false
  /** cfx send成功 */
  cfxSendSuccessed: false
  /** cfx send失败 */
  cfxSendFailed: false
  /**最新转账成功的hash */
  lastFCSendSuccessHash: ''
}
type IDvaProps = IDispatch & ICFX & IFC
interface IProps extends Partial<IDvaProps> {
  lockStatus: boolean
}

class SiderContent extends Component<IProps> {
  static defaultProps = { lockStatus: true }
  render() {
    const { lockStatus } = this.props
    return (
      <div className={styles.siderMenusWrap}>
        <div className={styles.siderMenusTop}>
          <div className={styles.userInfo}>
            <div className={styles.userPicWrap}>
              <img src={Images.user} alt="" className={styles.userPic} />
            </div>
            <p className={styles.userCode}>
              0x2aff3112ea17f39d0x2aff3112ea17f39d0x2aff3112ea17f39d
            </p>
          </div>
          <div className={styles.operationWrap}>
            <OperationFuzhi lockStatus={lockStatus} />
            <OperationCode lockStatus={lockStatus} />
            <OperationDaochu lockStatus={lockStatus} />
            <OperationRecord lockStatus={lockStatus} />
          </div>
          <MenuList lockStatus={lockStatus} />
        </div>
        <div className={styles.siderMenusBottom}>
          <p className={styles.official}>Official Website</p>
          <p className={styles.official}>Official Scan</p>
          <p className={styles.official}>Official Bounty</p>
          <p className={styles.copyText}>Copyright © 2019 Conflux. All Rights Reserved</p>
        </div>
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
    ...models[namespaceOfFc],
  }
}

export default connect(mapStateToProps)(SiderContent)
