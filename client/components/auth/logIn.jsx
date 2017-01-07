var React = require('react')

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export class FullPageLogIn extends React.Component {

  onLogIn(event) {
    event.preventDefault()
    this.props.onLogIn(
      this.state.email,
      this.state.password
    )
  }

  setAttribute(key, event) {
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }

  render() {
    let alert

    if (this.props.message) {
      alert = (
        <div className="alert alert-danger" role="alert">{this.props.message}</div>
      )
    }

    return (
      <div className="container">
        {alert}
        <form onSubmit={this.onLogIn.bind(this)}>
          <EmailFieldSet onChange={this.setAttribute.bind(this, 'email')} />
          <PasswordFieldSet onChange={this.setAttribute.bind(this, 'password')} />

          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    )
  }

}

export class LogInModal extends React.Component {

  onLogIn(event) {
    event.preventDefault()
    this.props.onLogIn(
      this.state.email,
      this.state.password
    )
  }

  onClose(event) {
    event.preventDefault()
    this.props.onClose()
  }

  setAttribute(key, event) {
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }

  render() {
    if (this.props.message) {
      alert = (
        <div className="alert alert-danger" role="alert">{this.props.message}</div>
      )
    }

    return (
      <Modal>
        <ModalHeader>Log In</ModalHeader>
        <form onSubmit={this.onLogIn.bind(this)}>
          <fieldset disabled={this.props.isFetching}>
            <ModalBody>
              {alert}
              <EmailFieldSet onChange={this.setAttribute.bind(this, 'email')} />
              <PasswordFieldSet onChange={this.setAttribute.bind(this, 'password')} />
            </ModalBody>
            <ModalFooter>
              <SecondaryButton
                onClick={this.onClose.bind(this)}
                disabled={this.props.isFetching}
              >
                Close
              </SecondaryButton>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={this.props.isFetching}
              >
                Log In
              </button>
            </ModalFooter>
          </fieldset>
        </form>
      </Modal>
    )
  }

}

class EmailFieldSet extends React.Component {

  render() {
    return (
      <fieldset className="form-group">
        <label>Email</label>
        <input onChange={this.props.onChange} className="form-control" type="email" />
      </fieldset>
    )
  }

}

class PasswordFieldSet extends React.Component {

  render() {
    return (
      <fieldset className="form-group">
        <label>Password</label>
        <input onChange={this.props.onChange} className="form-control" type="password" />
      </fieldset>
    )
  }

}
