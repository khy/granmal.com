import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import reducer from './reducer'
import { ActionTypes } from './actions'
import Overview from './Overview'

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

  render() {
    if (this.props.auth && this.props.auth.account) {
      return <Overview />
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
  auth: state.auth
}}

const ConnectedApp = connect(select)(App)

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#app')
)
