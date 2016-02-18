import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'
import u from 'updeep'

import { FullPageLogIn } from 'client/components/auth/logIn'

import config from './config'
import reducer from './reducers'
import { ActionTypes, bootstrap } from './actions/app'
import { logIn } from 'client/actions/auth'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import Account from './components/Account'
import Contexts from './components/Contexts'
import Month from './components/Month'
import PlannedTxns from './components/PlannedTxns'
import TxnTypes from './components/TxnTypes'
import Prestitial from 'client/components/ads/Prestitial'

require("./app.scss")

const initialState = {
  auth: {
    account: config.account
  }
}

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, initialState)

class App extends React.Component {

  componentWillMount() {
    this.bootstrap(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.bootstrap(newProps)
  }

  bootstrap(props) {
    if (
      props.auth.account &&
      !props.app.isBootstrapped &&
      !props.app.isBootstrapping
    ) {
      this.props.dispatch(bootstrap())
    }
  }

  logIn(email, password) {
    event.preventDefault()
    this.props.dispatch(logIn(email, password))
  }

  dismissPrestitial() {
    this.props.dispatch({
      type: ActionTypes.DismissPrestitial
    })
  }

  render() {
    const loggedIn = this.props.auth.account

    if (this.props.app.prestitialDismissed) {
      if (loggedIn) {
        return this.props.children
      } else {
        return (
          <div>
            <Navbar />
            <FullPageLogIn
              message="You must log in to use Budget."
              onLogIn={this.logIn.bind(this)}
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
        <Route path="account/:accountGuid" component={Account} />
        <Route path="contexts" component={Contexts} />
        <Route path="months/:year/:month" component={Month} />
        <Route path="plannedTransactions" component={PlannedTxns} />
        <Route path="transactionTypes" component={TxnTypes} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
