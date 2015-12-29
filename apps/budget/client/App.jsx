import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'
import u from 'updeep'

import reducer from './reducers'
import { ActionTypes, bootstrap } from './actions/app'
import { login } from 'client/actions/auth'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import PlannedTxns from './components/PlannedTxns'
import Prestitial from 'client/components/ads/Prestitial'
import Login from 'client/components/auth/Login'

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.initialState)

class App extends React.Component {

  login(email, password) {
    event.preventDefault()
    this.props.dispatch(login(email, password))
  }

  dismissPrestitial() {
    this.props.dispatch({
      type: ActionTypes.DismissPrestitial
    })
  }

  render() {
    const loggedIn = this.props.auth && this.props.auth.account

    if (loggedIn && !this.props.app.isBootstrapped) {
      this.props.dispatch(bootstrap())
    }

    if (this.props.app.prestitialDismissed) {
      if (loggedIn) {
        return this.props.children
      } else {
        return (
          <div>
            <Navbar />
            <Login
              message="You must log in to use Budget."
              onLogin={this.login.bind(this)}
            />
          </div>
        )
      }
    } else {
      return <Prestitial
        appIsReady={!loggedIn || this.props.app.isBootstrapped}
        onContinue={this.dismissPrestitial.bind(this)}
      />
    }
  }

}

function select(state) { return {
  dispatch: state.dispatch,
  auth: state.auth,
  app: state.app,
}}

const ConnectedApp = connect(select)(App)

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/budget" component={ConnectedApp}>
        <IndexRoute component={Overview} />
        <Route path="plannedTransactions" component={PlannedTxns} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
