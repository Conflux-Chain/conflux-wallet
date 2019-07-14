import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import { I18NProps } from '@/i18n/context'
interface IProps extends Partial<I18NProps> {
  isShow: boolean
  onClose?: () => void
}
class BalanceDetailsModal extends Component<IProps> {
  handleClose() {
    this.props.onClose()
  }
  render() {
    const { isShow } = this.props
    return (
      <Dialog
        maxWidth="md"
        onClose={() => {
          this.handleClose()
        }}
        className={styles.dialog}
        open={isShow}
      >
        <MuiDialogTitle>
          <div>
            <h1 className={styles.dialogTitle}>FC的设计原则</h1>
          </div>
          <IconButton
            aria-label="Close"
            className={styles.dialogCloseBtn}
            onClick={() => {
              this.handleClose()
            }}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <div className={styles.formContentText}>
          社区成员可以通过两个渠道获得FC：Conflux基金会发放和他人转账。为了倡导社区成员通过参与Conflux社区建设的方式获得FC，并强调FC并非正式流通数字货币，Conflux基金会对不同渠道所获得的FC的流动性进行了特别区分：
          <br />
          1. 由Conflux基金会直接发放的FC，可以自由进行二次分配
          <br />
          2.
          从其他社区成员处获得的FC，进行二次分配时，此部分FC的流动性将受到限制，即在转账金额的基础上，需额外锁定一定数量的FC
          <br />
          <br />
          例如：
          A完成了一个Conflux生态建设赏金任务获得了10个FC，并从另一个Conflux社区成员通过转账的方式获得了10个FC，此时A总共拥有20个FC。但此时A无法完全转出这20个FC，通过赏金任务劳动所得的10个FC可以完全转出，通过交易获得的10FC中，假设当前流动性限制参数为100，那么意味着每转出5个FC就会有5个FC的流动性被锁定，因此最多只能转出15个FC。
        </div>
      </Dialog>
    )
  }
}
export default BalanceDetailsModal
