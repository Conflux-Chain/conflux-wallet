import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Layout from '@/pages/layout'
import AuthComponent from '@/pages/auth'
import { asyncComponent } from '@/utils/tools/react'
import { routes } from '@/router-route-mapping'
class Router extends Component {
  render() {
    const isLogin = true
    return (
      <>
        <Route path="/" exact component={() => <AuthComponent isNeedReplace />} />
        {isLogin ? (
          routes.map((item, index) => {
            const ChildComponent = asyncComponent(() => import(`@/pages${item.componentPath}`))
            return (
              <Route
                strict
                exact
                key={index}
                path={item.routePath}
                component={() => (
                  <AuthComponent>
                    <Layout>
                      <ChildComponent />
                    </Layout>
                  </AuthComponent>
                )}
              />
            )
          })
        ) : (
          <>
            <Layout>
              <Route
                path="/login"
                exact
                component={asyncComponent(() => import('@/pages/login'))}
              />
              <Route component={AuthComponent} />
            </Layout>
          </>
        )}
      </>
    )
  }
}
export default Router
