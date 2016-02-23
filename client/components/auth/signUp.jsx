var React = require('react')

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export class SignUpModal extends React.Component {

  onLogIn(event) {
    event.preventDefault()

    this.props.onSignUp(
      this.refs.emailInput.value,
      this.refs.handleInput.value,
      this.refs.nameInput.value,
      this.refs.passwordInput.value
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
        <ModalHeader>Sign Up</ModalHeader>
        <form onSubmit={this.onLogIn.bind(this)}>
          <fieldset disabled={this.props.isFetching}>
            <ModalBody>
              {alert}

              <fieldset className="form-group">
                <label>Email</label>
                <input ref="emailInput" className="form-control" type="email" />
              </fieldset>

              <fieldset className="form-group">
                <label>Handle</label>
                <input ref="handleInput" className="form-control" type="text" />
              </fieldset>

              <fieldset className="form-group">
                <label>Name</label>
                <input ref="nameInput" className="form-control" type="text" />
              </fieldset>

              <fieldset className="form-group">
                <label>Password</label>
                <input ref="passwordInput" className="form-control" type="password" />
              </fieldset>
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
                Sign Up
              </button>
            </ModalFooter>
          </fieldset>
        </form>
      </Modal>
    )
  }

}
