var React = require('react')

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export class FullPageLogIn extends React.Component {

  onLogIn(event) {
    event.preventDefault()

    this.props.onLogIn(
      this.refs.email.inputValue,
      this.refs.password.inputValue
    )
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
          <EmailFieldSet ref="email" />
          <PasswordFieldSet ref="password" />

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
      this.refs.email.inputValue,
      this.refs.password.inputValue
    )
  }

  onClose(event) {
    event.preventDefault()
    this.props.onClose()
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
              <EmailFieldSet ref="email" />
              <PasswordFieldSet ref="password" />
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

  get inputValue() { return this.refs.emailInput.value }

  render() {
    return (
      <fieldset className="form-group">
        <label>Email</label>
        <input ref="emailInput" className="form-control" type="email" />
      </fieldset>
    )
  }

}

class PasswordFieldSet extends React.Component {

  get inputValue() { return this.refs.passwordInput.value }

  render() {
    return (
      <fieldset className="form-group">
        <label>Password</label>
        <input ref="passwordInput" className="form-control" type="password" />
      </fieldset>
    )
  }

}
