import { hot } from 'react-hot-loader/root'
import React from 'react'
import Router from '@/routes'

import dva from '@/utils/dva/index'
import models from '@/models'

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { I18NContextWrapper } from './i18n/context'

const createHistory = require('history').createBrowserHistory
export const history = createHistory()
export const routerReducer = connectRouter(history)
export const routerMiddlewareForDispatch = routerMiddleware(history)

export const app = dva({
  models,
  initState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddlewareForDispatch],
})

const f: React.FC = app.start(
  <ConnectedRouter history={history}>
    <I18NContextWrapper>
      <Router />
    </I18NContextWrapper>
  </ConnectedRouter>
)

export default (process.env.NODE_ENV === 'development' ? hot(f) : f)
