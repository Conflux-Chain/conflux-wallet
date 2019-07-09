// 登录模块modal外框
import React, { Component } from 'react'
import { styled } from '@material-ui/styles'
import classnames from 'classnames'
import styles from './style.module.scss'
import Modal from '@material-ui/core/Modal'
import RestoreWallet from '../restore-wallet'
import CreatWallet from '../creat-wallet'

const Mycontainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

interface IProps {
  open: boolean // 模态框是否开启
  onClose: () => void // 关闭方法
  type: 'creat' // 模态框类型： 'creat'为新建钱包，'restore'为重置钱包
  stepIndex: 0 // 当前步骤
}

export default class ModalLogin extends Component<IProps> {
  render() {
    const { open, onClose, type, stepIndex } = this.props
    return (
      <Modal open={open} onClose={onClose} className={styles.creatModal}>
        <Mycontainer>
          <div className={styles.container}>
            <div className={styles.dotBox}>
              <div
                className={
                  stepIndex ? styles.dotItem : classnames(styles.dotItem, styles.dotItemAc)
                }
              />
              <div
                className={
                  stepIndex ? classnames(styles.dotItem, styles.dotItemAc) : styles.dotItem
                }
              />
            </div>
            <div>{type === 'creat' ? <CreatWallet /> : <RestoreWallet />}</div>
          </div>
        </Mycontainer>
      </Modal>
    )
  }
}
