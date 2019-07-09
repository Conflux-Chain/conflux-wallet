import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
import Images from '@/assets/images/index'

class Operation extends Component {
  clickHandle() {}
  render() {
    return (
      <Tooltip title="Copy address to clipboard">
        <div className={styles.operationWrap}>
          <img src={Images.fuzhi} alt="" className={styles.icon} onClick={this.clickHandle} />
        </div>
      </Tooltip>
    )
  }
}
export default Operation
