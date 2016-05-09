import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import { showModal, hideModal } from 'client/actions/modal'

import Navbar from './components/Navbar'
import Index from './containers/Index'

require("./app.scss")

const emptyReducer = (state = {}, action) => state

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(emptyReducer, window.__INITIAL_STATE__)

class App extends React.Component {

  render() {
    return <div>
      <Navbar />
      {this.props.children}
    </div>
  }

}

const ConnectedApp = connect(state => state)(App)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/haiku" component={ConnectedApp}>
        <IndexRoute component={Index} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
