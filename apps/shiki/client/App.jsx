import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { connect, Provider } from 'react-redux'
import _get from 'lodash/get'

import { LogInModal } from 'client/components/auth/logIn'
import { AlertSuccess } from 'client/components/bootstrap/alert'
import { logIn } from 'client/actions/auth'
import { showModal, hideModal } from 'client/actions/modal'

import reducer from 'shiki/client/reducer'
import Navbar from 'shiki/client/components/Navbar'
import NavMenu from 'shiki/client/components/NavMenu'
import Index from 'shiki/client/containers/Index'
import Show from 'shiki/client/containers/Show'
import User from 'shiki/client/containers/User'
import NewHaiku from 'shiki/client/components/NewHaiku'
import { submitNewHaikuModal, showNewHaikuModal } from 'shiki/client/actions'

require("./app.scss")

const store = applyMiddleware(
  thunkMiddleware//, createLogger()
)(createStore)(reducer, window.__INITIAL_STATE__)

class App extends React.Component {

  constructor(props) {
    super(props)

    this.createHaiku = this.createHaiku.bind(this)
    this.showNewHaikuModal = this.showNewHaikuModal.bind(this)
    this.logIn = this.logIn.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showNavMenu() {
    this.props.dispatch(showModal('NavMenu'))
  }

  showNewHaikuModal() {
    this.props.dispatch(showNewHaikuModal())
  }

  createHaiku(newHaiku) {
    this.props.dispatch(submitNewHaikuModal(newHaiku))
  }

  logIn(email, password) {
    this.props.dispatch(logIn(email, password)).then(() => {
      this.props.dispatch({ type: 'ReloadApp' })
      this.hideModal()
    })
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'NewHaiku') {
        modal = (
          <NewHaiku {...this.props.modal.data}
            onCreate={this.createHaiku}
            onClose={this.hideModal}
            disabled={!this.props.modal.isEnabled}
          />
        )
      } else if (this.props.modal.name === 'NavMenu') {
        modal = (
          <NavMenu
            onNewHaiku={this.showNewHaikuModal}
            onClose={this.hideModal}
          />
        )
      } else if (this.props.modal.name === 'LogInModal') {
        modal = (
          <LogInModal {...this.props.modal.data}
            onLogIn={this.logIn}
            onClose={this.hideModal}
          />
        )
      }
    }

    let alert

    if (this.props.app.alert) {
      switch (this.props.app.alert.type) {
        case 'alertPosted':
          alert = <AlertSuccess>Your haiku has been posted!</AlertSuccess>
      }
    }

    return <div>
      <Navbar
        onButtonClick={this.showNavMenu.bind(this)}
      />

      <div className="container">
        {alert}
        {this.props.children}
      </div>

      {modal}
    </div>
  }

}

const ConnectedApp = connect(state => state)(App)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/shiki" component={ConnectedApp}>
        <IndexRoute component={Index} />
        <Route path="haiku/:guid" component={Show} />
        <Route path="user/:handle" component={User} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
