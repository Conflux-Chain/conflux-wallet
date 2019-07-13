import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import Hidden from '@material-ui/core/Hidden'
import imgs from '../../assets/images'

export default class About extends Component {
  render() {
    return (
      <div className={styles.about}>
        <h1 className={styles.h1}>About FC</h1>
        <div className={styles.container1}>
          <div className={styles.conBox}>
            <p className={styles.title}>什么是Fans Coin（FC）?</p>
            <p className={styles.con}>
              Fans Coin, 简称FC，由 Conflux基金会主导设计，与社区成员合
              作研发，并基于Conflux测试网运行的社区贡献智能合约，旨在调
              动起强大的社区力量，详细记录社区成员每一份贡献，同时对测
              试网进行更加充分的测试。Conflux基金会在Conflux生态的建设
              过程中，由衷感谢对其做出贡献的每一位社区成员。Conflux基金
              会将以测试网FC的形式记录下社区贡献，并承诺在主网上线后，
              与主网CFX进行1:1承兑服务，保障所有社区成员的劳动成果。
            </p>
          </div>
          <Hidden only={['xs', 'sm']}>
            <div className={styles.ballSmall} />
            <div className={styles.ballBig} />
          </Hidden>
        </div>
        <h2 className={styles.h2}>基金会与社区的约法三章</h2>
        <div className={styles.container2}>
          <div className={styles.line1}>
            <div className={styles.item1}>
              <svg className={classnames(styles.icon, styles.icon1)} aria-hidden="true">
                <use xlinkHref="#iconhuabanfuben" />
              </svg>
              <h3 className={styles.h3}>FC的分发原则</h3>
              <p className={styles.p}>
                FC的设计初衷是为社区的点滴贡献做好记录。作为Conflux社区成员，任何有效的贡献内容必须依据法律法规，尊重他人劳动成果，并对社区建设起到积极正面的影响。Conflux基金会尊重每一位社区成员的辛勤付出，每一个FC的发放都将以多渠道全透明的形式通告社区。
              </p>
            </div>
            <div className={styles.item1}>
              <svg className={classnames(styles.icon, styles.icon2)} aria-hidden="true">
                <use xlinkHref="#iconxianjinyuezhifu" />
              </svg>
              <h3 className={styles.h3}>FC的承兑原则</h3>
              <p className={styles.p}>
                Conflux基金会承诺，Conflux基金会持有的生态基金解锁后将优先用于承兑服务。Conflux主网预计在2019.Q4末
                -
                2020.Q1上线，在主网上线后，将立刻启动测试网FC和主网CFX的1:1承兑服务，具体承兑流程细则将在主网上线前发布。
              </p>
            </div>
          </div>
          <div className={styles.line2}>
            <div className={styles.titleBox}>
              <svg className={classnames(styles.iconSpe, styles.icon3)} aria-hidden="true">
                <use xlinkHref="#iconsheji" />
              </svg>
              <h3 className={styles.h3}>FC的承兑原则</h3>
            </div>
            <div className={styles.item2}>
              <p className={styles.p}>
                社区成员可以通过两个渠道获得FC：Conflux基金会发放和他人转账。为了倡导社区成员通过参与Conflux社区建设的方式获得FC，并强调FC并非正式流通数字货币，Conflux基金会对不同渠道所获得的FC的流动性进行了特别区分：
                1. 由Conflux基金会直接发放的FC，可以自由进行二次分配 2.
                从其他社区成员处获得的FC，进行二次分配时，此部分FC的流动性将受到限制，即在转账金额的基础上，需额外锁定一定数量的FC
              </p>
              <p className={styles.p}>
                例如： A完成了一个Conflux生态建设赏金任务获得了10个FC，并从另一个
                Conflux社区成员通过转账的方式获得了10个FC，此时A总共拥有20
                个FC。但此时A无法完全转出这20个FC，通过赏金任务劳动所得的
                10个FC可以完全转出，通过交易获得的10FC中，假设当前流动性限
                制参数为100，那么意味着每转出5个FC就会有5个FC的流动性被锁
                定，因此最多只能转出15个FC。
              </p>
            </div>
          </div>
        </div>
        <h2 className={styles.h2}>感谢</h2>
        <div className={styles.container3}>
          <img src={imgs.personPng} className={styles.person} alt="person" />
          <p className={styles.p} style={{ textAlign: 'center' }}>
            特别致谢Conflux社区成员Justin，Justin从最早参与Conflux基金会对FC设计的探讨，一路与Conflux基金会同行，并最终实现FC智能合约，
            功不可没，感谢Justin!
          </p>
        </div>
      </div>
    )
  }
}
