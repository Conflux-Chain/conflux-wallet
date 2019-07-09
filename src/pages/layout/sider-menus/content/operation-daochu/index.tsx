import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import Images from '@/assets/images/index'

class Operation extends Component {
  clickHandle() {}
  render() {
    return (
      <Tooltip title="Derive private key">
        <div className={styles.operationWrap}>
          <img src={Images.daochu} alt="" className={styles.icon} onClick={this.clickHandle} />
        </div>
      </Tooltip>
    )
  }
}
export default Operation
