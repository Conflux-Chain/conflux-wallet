import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'

class Operation extends Component {
  clickHandle() {}
  render() {
    return (
      <div className={styles.operationWrap}>
        <img src={Images.daochu} alt="" className={styles.icon} onClick={this.clickHandle} />
      </div>
    )
  }
}
export default Operation
