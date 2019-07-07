import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import OperationCode from './operation-code/index'
import OperationDaochu from './operation-daochu/index'
import OperationFuzhi from './operation-fuzhi/index'
import OperationRecord from './operation-record/index'
import MenuList from './menu-list/index'

// interface IProps {
//   isLogin: boolean
//   mobileOpen: boolean
//   onToggleMenus?: () => void
// }

class SiderContent extends Component {
  render() {
    return (
      <div className={styles.siderMenusWrap}>
        <div className={styles.userInfo}>
          <div className={styles.userPicWrap}>
            <img src={Images.user} alt="" className={styles.userPic} />
          </div>
          <p className={styles.userCode}>0x2aff3112ea17f39d0x2aff3112ea17f39d0x2aff3112ea17f39d</p>
        </div>
        <div className={styles.operationWrap}>
          <OperationFuzhi />
          <OperationCode />
          <OperationDaochu />
          <OperationRecord />
        </div>
        <MenuList />
      </div>
    )
  }
}
export default SiderContent
