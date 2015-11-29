import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import reducer from './reducer'
import { ActionTypes, bootstrap } from './actions'
import Overview from './Overview'
import Prestitial from 'client/components/ads/Prestitial'
import Login from 'client/components/auth/Login'

require('es6-promise').polyfill();
require('isomorphic-fetch');

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware, createLogger()
)(createStore)(reducer)

class App extends React.Component {

  login(email, password) {
    event.preventDefault()

    fetch('/sessions', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'same-origin',
    }).then((response) => {
      return response.json()
    }).then((account) => {
      this.props.dispatch({
        type: ActionTypes.Login,
        account
      })
    })
  }

  dismissPrestitial() {
    this.props.dispatch({
      type: ActionTypes.DismissPrestitial
    })
  }

  render() {
    const loggedIn = this.props.auth && this.props.auth.account

    if (loggedIn && !this.props.isBootstrapped) {
      this.props.dispatch(bootstrap())
    }

    if (this.props.prestitialDismissed) {
      if (loggedIn) {
        return <Overview />
      } else {
        return <Login
          message="You must log in to use Budget."
          onLogin={this.login.bind(this)}
        />
      }
    } else {
      return <Prestitial
        appIsReady={!loggedIn || this.props.isBootstrapped}
        onContinue={this.dismissPrestitial.bind(this)}
      />
    }
  }

}

function select(state) { return {
  dispatch: state.dispatch,
  auth: state.auth,
  isBootstrapped: state.isBootstrapped,
  prestitialDismissed: state.prestitialDismissed,
}}

const ConnectedApp = connect(select)(App)

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#app')
)
