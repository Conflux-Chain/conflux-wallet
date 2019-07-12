import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
import { namespace } from '@/models/home'
import { namespace as globalCommonNamespace } from '@/models/global/common'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Paper from '@material-ui/core/Paper'
import ContentCfx from './content-cfx/index'
import ContentFc from './content-fc/index'

type IProps = IDispatch &
  I18NProps & {
    lockStatus?: boolean
    testState: number
  }
class Home extends Component<IProps> {
  render() {
    const { lockStatus } = this.props

    return (
      <div>
        <h2 className={styles.pageTitle}>Your Wallet</h2>
        <p className={styles.pageTips}>
          Get the best prices without having to leave the security of your Wallet.
        </p>
        <h2 className={styles.pageTitle}>Your Wallet</h2>
        <p className={styles.pageTips}>
          Get the best prices without having to leave the security of your Wallet.
        </p>
        <h2 className={styles.pageTitle}>Your Wallet</h2>
        <p className={styles.pageTips}>
          Get the best prices without having to leave the security of your Wallet.
        </p>
        <h2 className={styles.pageTitle}>Your Wallet</h2>
        <p className={styles.pageTips}>
          Get the best prices without having to leave the security of your Wallet.
        </p>
        <div className={styles.cardWrap}>
          <Paper className={styles.pageCard}>
            <ContentCfx lockStatus={lockStatus} />
          </Paper>
          <Paper className={classnames(styles.pageCard, styles.cardFC)}>
            <ContentFc lockStatus={lockStatus} />
          </Paper>
        </div>
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
    ...models[globalCommonNamespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Home))
