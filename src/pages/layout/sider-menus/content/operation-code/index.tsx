import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import Images from '@/assets/images/index'

class Operation extends Component {
  clickHandle() {}
  render() {
    return (
      <Tooltip title="View address in QR code">
        <div className={styles.operationWrap}>
          <img src={Images.code} alt="" className={styles.icon} onClick={this.clickHandle} />
        </div>
      </Tooltip>
    )
  }
}
export default Operation
