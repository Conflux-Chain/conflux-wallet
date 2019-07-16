import React from 'react'
import { create } from 'dva-core'
import { Provider } from 'react-redux'

export default function(options) {
  const app = create(options)
  options.models.forEach(model => app.model(model))
  app.start()
  const store = app._store
  app.start = container => {
    return () => <Provider store={store}>{container}</Provider>
  }
  app.getStore = () => store

  return app
}
