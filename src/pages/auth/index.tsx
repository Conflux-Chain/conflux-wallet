import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// import { judgeLoginStatus } from '@/utils/tools'
type IProps = RouteComponentProps & {
  isNeedReplace?: boolean
}
class Auth extends Component<IProps> {
  componentDidMount() {
    const isLogin = true
    if (isLogin) {
      if (this.props.isNeedReplace) {
        this.props.history.replace('/wallet')
      }
    } else {
      this.props.history.replace('/login')
    }
  }
  render() {
    return <>{this.props.children}</>
  }
}

export default withRouter(Auth)
