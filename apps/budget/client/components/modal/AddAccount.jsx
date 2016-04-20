import React from 'react'
import _map from 'lodash/map'

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class AddAccount extends React.Component {

  get isDisabled() {
    return !this.props.isEnabled
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newAccount = {
      contextGuid: this.props.contextGuid,
      accountType: this.refs.accountTypeGuidSelect.value,
      name: this.refs.nameInput.value,
      initialBalance: parseFloat(this.refs.initialBalanceInput.value),
    }

    this.props.onAdd(newAccount)
  }

  render() {

    const accountTypeOptions = (
      _map(this.props.accountTypes, (accountType) => {
        return <option value={accountType.key} key={accountType.key}>{accountType.name}</option>
      })
    )

    return (
      <Modal>
        <ModalHeader onClose={this.close.bind(this)}>New Account</ModalHeader>
        <form onSubmit={this.add.bind(this)}>
          <ModalBody>
            <fieldset disabled={this.isDisabled}>
              <fieldset className="form-group">
                <label>Account Type</label>
                <select ref="accountTypeGuidSelect" className="form-control">
                  {accountTypeOptions}
                </select>
              </fieldset>

              <fieldset className="form-group">
                <label>Name</label>
                <input ref="nameInput" className="form-control" type="text" />
              </fieldset>

              <fieldset className="form-group">
                <label>Intial Balance</label>
                <input ref="initialBalanceInput" className="form-control" type="text" />
              </fieldset>
            </fieldset>
          </ModalBody>
          <ModalFooter>
            <SecondaryButton
              onClick={this.close.bind(this)}
              disabled={this.isDisabled}
            >
              Close
            </SecondaryButton>

            <PrimaryButton
              type="submit"
              onClick={this.add.bind(this)}
              disabled={this.isDisabled}
            >
              Add
            </PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    )
  }

}
