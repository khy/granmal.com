import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'

import { logIn, signUp, logOut } from 'client/actions/auth'
import Navbar from 'client/components/nav/Navbar'
import { LogInModal } from 'client/components/auth/logIn'
import { SignUpModal } from 'client/components/auth/signUp'
import { Alert } from 'client/components/bootstrap/alert'
import config from 'client/config'

import reducer from '_index/client/reducer'
import { alertSuccess, alertWarning } from '_index/client/actions'
import AppList from '_index/client/components/AppList'
import NavMenu from '_index/client/components/NavMenu'

require('./app.scss')

const store = applyMiddleware(
  thunkMiddleware //, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  showNavMenu() {
    this.setState({activeModal: 'navMenu'})
  }

  showLogIn() {
    this.setState({activeModal: 'logIn'})
  }

  showSignUp() {
    this.setState({activeModal: 'signUp'})
  }

  hideModal() {
    this.setState({activeModal: undefined})
  }

  logIn(email, password) {
    return this.props.dispatch(logIn(email, password)).then(() => {
      this.props.dispatch(alertSuccess('You logged in successfully!'))
      this.hideModal()
    })
  }

  signUp(email, handle, name, password) {
    return this.props.dispatch(signUp(email, handle, name, password)).then(() => {
      this.props.dispatch(alertSuccess('You signed up successfully!'))
      this.hideModal()
    })
  }

  logOut() {
    return this.props.dispatch(logOut()).then(() => {
      this.props.dispatch(alertWarning('You logged out.'))
      this.hideModal()
    })
  }

  render() {

    let modal

    if (this.state.activeModal === 'navMenu') {
      modal = <NavMenu
        account={this.props.auth.account}
        onLogOut={this.logOut.bind(this)}
        onLogIn={this.showLogIn.bind(this)}
        onSignUp={this.showSignUp.bind(this)}
        onClose={this.hideModal.bind(this)}
      />
    } else if (this.state.activeModal === 'logIn') {
      modal = <LogInModal
        onLogIn={this.logIn.bind(this)}
        onClose={this.hideModal.bind(this)}
      />
    } else if (this.state.activeModal === 'signUp') {
      modal = <SignUpModal
        onSignUp={this.signUp.bind(this)}
        onClose={this.hideModal.bind(this)}
      />
    }


    let alert

    if (this.props.index.alert) {
      alert = <Alert context={this.props.index.alert.context}>
        {this.props.index.alert.message}
      </Alert>
    }

    return (
      <div>
        <Navbar title="Gran Mal" titleUrl="/" onButtonClick={this.showNavMenu.bind(this)} />

        <div className="container">
          {alert}
          {this.props.children}
        </div>

        {modal}
      </div>
    )
  }
}

const app = connect((state) => state)(App)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={app}>
        <IndexRoute component={AppList} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
