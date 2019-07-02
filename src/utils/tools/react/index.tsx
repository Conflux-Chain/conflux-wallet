import React, { Component } from 'react'

export function asyncComponent(importComponent) {
  class AsyncComponent extends Component<
    {},
    {
      component: any
    }
  > {
    constructor(props) {
      super(props)

      this.state = {
        component: null,
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component,
      })
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}
