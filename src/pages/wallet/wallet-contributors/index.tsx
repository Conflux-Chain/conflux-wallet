import React, { Component } from 'react'
import styles from './style.module.scss'

interface IProps {
  I18N: any
}

export default class WalletContributors extends Component<IProps> {
  render() {
    const { I18N } = this.props
    const { contributors } = this.props.I18N.Wallet.WalletContributors
    return (
      <div className={styles.box}>
        <div className={styles.innerBox}>
          <p className={styles.title}>{I18N.Wallet.WalletContributors.title}</p>
          <div className={styles.lists}>
            {contributors.map((item, index) => (
              <div className={styles.listItem} key={`contributor${index}`}>
                <img src={item.avator} className={styles.img} alt="" />
                <p className={styles.name}>{item.name}</p>
              </div>
            ))}
          </div>
          <p className={styles.desc}>{I18N.Wallet.WalletContributors.description}</p>
        </div>
      </div>
    )
  }
}
