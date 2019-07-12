import React, { Component } from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'
import { namespace as globalCommonNamespace } from '@/models/global/common'
import { connect } from 'react-redux'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Paper from '@material-ui/core/Paper'
import ContentCfx from './content-cfx/index'
import ContentFc from './content-fc/index'

import { namespace } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { IDvaProps } from './typings'

interface IProps extends IDvaProps, I18NProps {
  lockStatus?: boolean
  testState: number
}
class Home extends Component<IProps> {
  render() {
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
            <ContentCfx {...this.props} />
          </Paper>
          <Paper className={classnames(styles.pageCard, styles.cardFC)}>
            <ContentFc {...this.props} />
          </Paper>
        </div>
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
    ...models[namespaceOfFc],
    ...models[globalCommonNamespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Home))
