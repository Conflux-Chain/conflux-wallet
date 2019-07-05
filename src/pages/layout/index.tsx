import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { namespace as globalMenuNamespace } from '@/models/global/menu'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
type IProps = RouteComponentProps & {
  selectedKeys?: any[]
  openKeys?: any[]
  dispatch?: any
}

/**
 * Layout组件
 */
class BasicLayout extends Component<IProps> {
  onSelect = ({ selectedKeys }) => {
    this.props.dispatch({
      type: `${globalMenuNamespace}/setState`,
      payload: {
        selectedKeys,
      },
    })
  }
  onOpenChange = ({ openKeys }) => {
    this.props.dispatch({
      type: `${globalMenuNamespace}/setState`,
      payload: {
        openKeys,
      },
    })
  }

  onChangeBreadcrumb = ({ breadcrumbs }) => {
    this.setState({
      breadcrumbs,
    })
  }

  render() {
    return (
      <div>
        <AppBar>123</AppBar>
      </div>
    )
  }
}

const mapStateToProps = models => {
  return {
    ...models[globalMenuNamespace],
  }
}
export default withRouter(connect(mapStateToProps)(BasicLayout))
