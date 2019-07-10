import React, { Component } from 'react'
import styles from './style.module.scss'
// import { Link } from 'react-router-dom'
export default class About extends Component {
  render() {
    return (
      <div className={styles.about}>
        <h1 className={styles.testFin}>About FC</h1>
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
          <div className={styles.ballSmall} />
          <div className={styles.ballBig} />
        </div>
      </div>
    )
  }
}
