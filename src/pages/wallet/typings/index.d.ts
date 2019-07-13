/**
 * cfx相关props
 */
export interface ICFX {
  /**当前登陆的账户地址 */
  currentAccountAddress: ''
  /**当前登陆的private key*/
  currentAccountPrivateKey: ''
  /** cfx余额 */
  cfxBalance: 0
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
export interface IFC {
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
export interface IDvaProps extends IDispatch, ICFX, IFC {}
