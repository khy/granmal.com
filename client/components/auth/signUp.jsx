var React = require('react')

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export class SignUpModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  onLogIn(event) {
    event.preventDefault()
    this.props.onSignUp(
      this.state.email,
      this.state.handle,
      this.state.name,
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
        <ModalHeader>Sign Up</ModalHeader>
        <form onSubmit={this.onLogIn.bind(this)}>
          <fieldset disabled={this.props.isFetching}>
            <ModalBody>
              {alert}

              <fieldset className="form-group">
                <label>Email</label>
                <input onChange={this.setAttribute.bind(this, 'email')} className="form-control" type="email" />
              </fieldset>

              <fieldset className="form-group">
                <label>Handle</label>
                <input onChange={this.setAttribute.bind(this, 'handle')} className="form-control" type="text" />
              </fieldset>

              <fieldset className="form-group">
                <label>Name</label>
                <input onChange={this.setAttribute.bind(this, 'name')} className="form-control" type="text" />
              </fieldset>

              <fieldset className="form-group">
                <label>Password</label>
                <input onChange={this.setAttribute.bind(this, 'password')} className="form-control" type="password" />
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
