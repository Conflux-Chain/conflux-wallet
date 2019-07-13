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
import { IDispatch } from '@/typings'
import { namespace } from '@/models/cfx'
import { namespace as namespaceOfFc } from '@/models/fc'
import { IDvaProps } from './typings'
interface IProps extends IDvaProps, I18NProps, IDispatch {
  lockStatus?: boolean
  testState: number
}
class Home extends Component<IProps> {
  onSendCfx(data) {
    this.props.dispatch({
      type: `${namespace}/send`,
      payload: {
        payload: data,
      },
    })
  }
  onSendFc(data) {
    this.props.dispatch({
      type: `${namespaceOfFc}/send`,
      payload: {
        payload: data,
      },
    })
  }
  render() {
    return (
      <div>
        <h2 className={styles.pageTitle}>Your Wallet</h2>
        <p className={styles.pageTips}>
          Get the best prices without having to leave the security of your Wallet.
        </p>
        <div className={styles.cardWrap}>
          <Paper className={styles.pageCard}>
            <ContentCfx
              {...this.props}
              onSendCfx={sendData => {
                this.onSendCfx(sendData)
              }}
            />
          </Paper>
          <Paper className={classnames(styles.pageCard, styles.cardFC)}>
            <ContentFc
              {...this.props}
              onSendFc={sendData => {
                this.onSendFc(sendData)
              }}
            />
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
