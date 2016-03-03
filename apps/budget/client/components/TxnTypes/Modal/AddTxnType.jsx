import React from 'react'
import _map from 'lodash/collection/map'

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class AddTxnTypeModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newTxnType = {
      contextGuid: this.props.contextGuid,
      parentGuid: this.props.parentTxnType.guid,
      name: this.refs.nameInput.value,
    }

    this.props.onAdd(newTxnType)
  }

  render() {
    return (
      <Modal>
        <ModalHeader>New Transaction Type</ModalHeader>
        <ModalBody>
          <form>
            <fieldset disabled={this.props.modalIsPosting}>
              <fieldset className="form-group">
                <label>Parent Transaction Type</label>
                <input className="form-control" type="text" placeholder={this.props.parentTxnType.name} readOnly />
              </fieldset>

              <fieldset className="form-group">
                <label>Name</label>
                <input ref="nameInput" className="form-control" type="text" />
              </fieldset>
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <SecondaryButton
            onClick={this.close.bind(this)}
            disabled={this.props.modalIsPosting}
          >
            Close
          </SecondaryButton>

          <PrimaryButton
            onClick={this.add.bind(this)}
            disabled={this.props.modalIsPosting}
          >
            Add
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
