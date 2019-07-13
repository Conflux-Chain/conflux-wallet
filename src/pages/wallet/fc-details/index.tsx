import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Link } from 'react-router-dom'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
interface IProps {
  anchorEl: null | HTMLElement
  onClose?: () => void
  width?: Breakpoint
}
class FcDetails extends Component<IProps> {
  state = {
    showModal: false,
  }
  tipClose() {
    this.props.onClose()
  }
  render() {
    return (
      <div className={styles.tooltipWrap}>
        <div className={styles.iconWrap}>
          {this.props.children}
          {isWidthUp('sm', this.props.width) ? (
            <div className={styles.fcDetailsContent}>
              <p>
                Fans Coin, 简称FC，由 Conflux基金会主导 设计，与社区成员合作研发，并基于Conflux
                测试网运行的社区贡献智能合约，旨在调动 起强大的社区力量，详细记录社区成员每一
                份贡献，同时对测试网进行更加充分的测试。 Conflux基金会在Conflux生态的建设过程中，
                由衷感谢对其做出贡献的每一位社区成员。 Conflux基金会将以测试网FC的形式记录下
                社区贡献，并承诺在主网上线后，与主网 CFX进行1:1承兑服务，保障所有社区成员的 劳动成果
              </p>
              <Link to="/about">
                <p className={styles.fcDetailsLink}>
                  View More{' '}
                  <svg className={styles.icon} aria-hidden="true">
                    <use xlinkHref="#icongengduo1" />
                  </svg>
                </p>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
export default withWidth()(FcDetails)
