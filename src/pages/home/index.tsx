import React, { Component } from 'react'
import styles from './style.module.scss'
import { namespace } from '@/models/home'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { push } from 'connected-react-router'
import { Button } from '@material-ui/core'
import { I18NContext } from '@/i18n/context'
import { LangEnum } from '@/i18n/typing'

interface IProps extends IDispatch {
  testState: number
}
class Home extends Component<IProps> {
  render() {
    return (
      <I18NContext.Consumer>
        {({ I18N, setLangTriggerRender }) => {
          return (
            <>
              <h1>{I18N.testField}</h1>
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
        }}
      </I18NContext.Consumer>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
  }
}
export default connect(mapStateToProps)(Home)
