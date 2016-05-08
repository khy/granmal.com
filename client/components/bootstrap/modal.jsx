import React from 'react'

export class Modal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <div className="modal-backdrop in" onClick={this.close.bind(this)}></div>
        <div className="modal" style={{display: 'block', paddingLeft: '0px'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export function ModalHeader(props) {
  return (
    <div className="modal-header">
      <button className="close" type="button" onClick={props.onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">{props.children}</h4>
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
      <Modal>
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
              disabled={this.isDisabled}
            >
              {this.props.cancelText}
            </SecondaryButton>

            <PrimaryButton
              type="submit"
              onClick={this.submit}
              disabled={this.isDisabled}
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
