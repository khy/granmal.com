import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import reducer from 'fran/client/reducer'
import Container from 'fran/client/components/Container'
import Index from 'fran/client/components/Index'
import NewWorkout from 'fran/client/components/NewWorkout'

require('./app.scss')

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/fran' component={Container}>
        <IndexRoute component={Index} />
        <Route path='workouts/new' component={NewWorkout} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
