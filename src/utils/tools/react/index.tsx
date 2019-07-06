import React, { Component, PureComponent } from 'react'
import { I18NContext } from '@/i18n/context'

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

export const I18NHOC = WrappedComponent =>
  class WrapperComponent extends PureComponent {
    render() {
      return (
        <I18NContext.Consumer>
          {({ I18N, setLangTriggerRender }) => (
            <WrappedComponent
              I18N={I18N}
              setLangTriggerRender={setLangTriggerRender}
              {...this.props}
            />
          )}
        </I18NContext.Consumer>
      )
    }
  }
