import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './style.module.scss'
class BalanceDetails extends Component {
  hideModal() {}
  render() {
    return (
      <Tooltip title={'123'}>
        <div className={styles.iconWrap}>
          <React.Fragment>{this.props.children}</React.Fragment>
        </div>
      </Tooltip>
    )
  }
}
export default BalanceDetails
