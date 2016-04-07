import React from 'react'
import _map from 'lodash/map'

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class EditTxnType extends React.Component {

  get isDisabled() {
    return !this.props.isEnabled
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  edit(event) {
    event.preventDefault()

    const attributes = {
      parentGuid: this.refs.txnTypeGuidSelect.value,
      name: this.refs.nameInput.value,
    }

    this.props.onEdit(this.props.txnType.guid, attributes)
  }

  render() {
    const txnTypeOptions = _map(this.props.txnTypes, (txnType) => {
      return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
    })

    return (
      <Modal>
        <ModalHeader>Edit "{this.props.txnType.name}"</ModalHeader>
        <ModalBody>
          <form>
            <fieldset disabled={this.isDisabled}>
              <fieldset className="form-group">
                <label>Parent Transaction Type</label>
                <select defaultValue={this.props.txnType.parentGuid} ref="txnTypeGuidSelect" className="form-control">
                  {txnTypeOptions}
                </select>
              </fieldset>

              <fieldset className="form-group">
                <label>Name</label>
                <input ref="nameInput" defaultValue={this.props.txnType.name} className="form-control" type="text" />
              </fieldset>
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <SecondaryButton
            onClick={this.close.bind(this)}
            disabled={this.isDisabled}
          >
            Close
          </SecondaryButton>

          <PrimaryButton
            onClick={this.edit.bind(this)}
            disabled={this.isDisabled}
          >
            Edit
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
