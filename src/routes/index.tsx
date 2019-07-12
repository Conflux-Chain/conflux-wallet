import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Layout from '@/pages/layout'
import AuthComponent from '@/pages/auth'
import { asyncComponent } from '@/utils/tools/react'
import { routes } from '@/router-route-mapping'
import { namespace } from '@/models/global/common'
import { connect } from 'react-redux'

const LoginComponent = asyncComponent(() => import('@/pages/login'))
class Router extends Component<{ isLogin?: boolean }> {
  render() {
    const { isLogin } = this.props
    return (
      <>
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
                  <AuthComponent isLogin={isLogin} isNeedReplace>
                    <Layout isShowLeftMenu>
                      <ChildComponent />
                    </Layout>
                  </AuthComponent>
                )}
              />
            )
          })
        ) : (
          <>
            <Route
              path="/login"
              exact
              component={() => {
                return (
                  <AuthComponent>
                    <Layout>
                      <LoginComponent />
                    </Layout>
                  </AuthComponent>
                )
              }}
            />
          </>
        )}
        <Route path="*" exact component={() => <AuthComponent isLogin={isLogin} isNeedReplace />} />
      </>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
  }
}
export default connect(mapStateToProps)(Router)
