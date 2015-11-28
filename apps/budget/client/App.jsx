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

require('es6-promise').polyfill();
require('isomorphic-fetch');

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware, createLogger()
)(createStore)(reducer)

class App extends React.Component {

  login(event) {
    event.preventDefault()

    fetch('/sessions', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.refs.emailInput.value,
        password: this.refs.passwordInput.value,
      }),
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
    if (this.props.auth && this.props.auth.account) {
      if (!this.props.isBootstrapped) {
        this.props.dispatch(bootstrap())
      }

      if (this.props.prestitialDismissed) {
        return <Overview />
      } else {
        return <Prestitial
          appIsReady={this.props.isBootstrapped}
          onContinue={this.dismissPrestitial.bind(this)}
        />
      }
    } else {
      return (
        <div>
          <div className="container">
            <form onSubmit={this.login.bind(this)}>
              <fieldset className="form-group">
                <label>Email</label>
                <input ref="emailInput" className="form-control" type="email" />
              </fieldset>

              <fieldset className="form-group">
                <label>Password</label>
                <input ref="passwordInput" className="form-control" type="password" />
              </fieldset>

              <button type="submit" className="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      )
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
