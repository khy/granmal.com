import React from 'react'
import { connect } from 'react-redux'

import { logIn, signUp, logOut } from 'client/actions/auth'
import Navbar from 'client/components/nav/Navbar'
import { LogInModal } from 'client/components/auth/logIn'
import { SignUpModal } from 'client/components/auth/signUp'
import { Alert } from 'client/components/bootstrap/alert'

import NavMenu from './Modal/NavMenu'
import { alertSuccess, alertWarning } from '_index/client/actions'

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
    const apps = [
      {
        key: 'budget',
        name: 'Budget',
        description: 'Personal finances for obsessive compulsives.',
      },
    ]

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

    const cards = apps.map( app => {
      return (
        <div className="card-app-link" key={app.key}>
          <div className="card-block">
            <a href={"/" + app.key}>
              <h5 className="card-title">{app.name}</h5>
              <p className="card-subtitle text-muted">{app.description}</p>
            </a>
          </div>
        </div>
      )
    })

    return (
      <div>
        <Navbar title="Gran Mal" titleUrl="/" onMenuClick={this.showNavMenu.bind(this)} />

        <div className="container">
          {alert}
          {cards}
        </div>

        {modal}
      </div>
    )
  }

}

export default connect((state) => state)(App)
