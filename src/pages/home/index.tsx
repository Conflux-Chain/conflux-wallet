import React, { Component } from 'react'
import styles from './style.module.scss'
import { namespace } from '@/models/home'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { push } from 'connected-react-router'

interface IProps extends IDispatch {
  testState: number
}
class Home extends Component<IProps> {
  render() {
    return (
      <>
        <h1 className={styles.test}>Home</h1>
        <h2>testState:{this.props.testState}</h2>
        <button
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
        </button>
        <button
          onClick={() => {
            this.props.dispatch(push('/about'))
          }}
        >
          go about
        </button>
      </>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
  }
}
export default connect(mapStateToProps)(Home)
