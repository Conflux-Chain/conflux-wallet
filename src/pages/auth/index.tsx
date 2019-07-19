import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// import { judgeLoginStatus } from '@/utils/tools'
type IProps = RouteComponentProps & {
  isLogin?: boolean
  isNeedReplace?: boolean
}
class Auth extends Component<IProps> {
  componentDidMount() {
    if (this.props.isLogin) {
      if (this.props.isNeedReplace) {
        this.props.history.replace('/wallet')
      }
    } else {
      if (this.props.location.pathname !== '/about') {
        this.props.history.replace('/login')
      }
    }
  }
  render() {
    return <>{this.props.children}</>
  }
}

export default withRouter(Auth)
