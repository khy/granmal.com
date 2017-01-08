import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap'

export class Modal extends React.Component {

  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.onClose)
    $(ReactDOM.findDOMNode(this)).modal('show')
  }

  componentWillUnmount() {
    // It is important to unbind the event because otherwise, if the modal
    // gets replaced, the underlying DOM node will be re-used.
    $(ReactDOM.findDOMNode(this)).off('hidden.bs.modal')
    $(ReactDOM.findDOMNode(this)).modal('hide')
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

}

export function ModalHeader(props) {
  return (
    <div className="modal-header">
      <h4 className="modal-title">{props.children}</h4>
      <button className="close" type="button" onClick={props.onClose}>
        <span>&times;</span>
      </button>
    </div>
  )
}

export const ModalBody = (props) => <div className="modal-body">{props.children}</div>

export const ModalFooter = (props) => <div className="modal-footer">{props.children}</div>

import { PrimaryButton, SecondaryButton } from './button'

export class FormModal extends React.Component {

  constructor(props) {
    super(props)
    this.cancel = this.cancel.bind(this)
    this.submit = this.submit.bind(this)
  }

  cancel(event) {
    event.preventDefault()
    this.props.onCancel()
  }

  submit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render() {
    return (
      <Modal onClose={this.props.onCancel}>
        <ModalHeader onClose={this.cancel}>{this.props.title}</ModalHeader>
        <form onSubmit={this.submit}>
          <ModalBody>
            <fieldset disabled={this.props.disabled}>
              {this.props.children}
            </fieldset>
          </ModalBody>
          <ModalFooter>
            <SecondaryButton
              onClick={this.cancel}
              disabled={this.props.disabled}
            >
              {this.props.cancelText}
            </SecondaryButton>

            <PrimaryButton
              type="submit"
              onClick={this.submit}
              disabled={this.props.disabled}
            >
              {this.props.submitText}
            </PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    )
  }

}

FormModal.propTypes = {
  title: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  submitText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
}

FormModal.defaultProps = {
  submitText: 'Submit',
  cancelText: 'Cancel',
}
