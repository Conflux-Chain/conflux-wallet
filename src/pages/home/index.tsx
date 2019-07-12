import React, { Component } from 'react'
import styles from './style.module.scss'
import { namespace } from '@/models/home'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { push } from 'connected-react-router'
import { Button } from '@material-ui/core'
import { LangEnum } from '@/i18n/typing'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import { ReactComponent as Logo } from './demo.svg'

type IProps = IDispatch &
  I18NProps & {
    testState: number
  }
class Home extends Component<IProps> {
  render() {
    const { I18N, setLangTriggerRender } = this.props
    return (
      <>
        <Logo />
        <h1>{I18N.Login.createWallet.titleH2}</h1>
        <Button
          onClick={() => {
            setLangTriggerRender(LangEnum.zh_CN)
          }}
        >
          切换中文语言
        </Button>
        <Button
          onClick={() => {
            setLangTriggerRender(LangEnum.en_US)
          }}
        >
          切换英文语言
        </Button>
        <h1 className={styles.test}>Home</h1>
        <h2>testState:{this.props.testState}</h2>
        <Button
          onClick={() => {
            this.props.dispatch({
              type: `${namespace}/setState`,
              payload: {
                testState: Math.random(),
              },
            })
          }}
        >
          modify state
        </Button>
        <Button
          onClick={() => {
            this.props.dispatch(push('/about'))
          }}
        >
          go about
        </Button>
      </>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Home))
