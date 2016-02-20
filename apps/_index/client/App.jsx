import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import config from 'client/config'

import reducer from './reducer'
import AppList from './containers/AppList'

require('./app.scss')

const initialState = {
  auth: {
    account: config.account
  }
}

const store = applyMiddleware(
  thunkMiddleware //, createLogger()
)(createStore)(reducer, initialState)

class App extends React.Component {
  render() {
    return this.props.children
  }
}

const app = connect((state) => state)(App)

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={app}>
        <IndexRoute component={AppList} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
