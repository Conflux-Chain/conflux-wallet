import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { asyncComponent } from '@/utils/tools/react'
import { routes } from '@/router-route-mapping'
class Router extends Component {
  render() {
    return (
      <>
        {routes.map((item, index) => {
          const ChildComponent = asyncComponent(() => import(`@/pages${item.componentPath}`))
          return (
            <Route
              strict
              exact
              key={index}
              path={item.routePath}
              component={() => <ChildComponent />}
            />
          )
        })}
      </>
    )
  }
}
export default Router
