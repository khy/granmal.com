import React from 'react'
import _map from 'lodash/map'

import { normalizeDateInput } from 'budget/client/lib/date'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class AddTransferModal extends React.Component {

  get isDisabled() {
    return !this.props.isEnabled
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const transfer = {
      fromAccountGuid: this.refs.fromAccountGuidSelect.value,
      toAccountGuid: this.refs.toAccountGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value),
    }

    this.props.onAdd(transfer)
  }

  render() {

    const accountOptions = (
      _map(this.props.accounts, (account) => {
        return <option value={account.guid} key={account.guid}>{account.name}</option>
      })
    )

    return (
      <Modal>
        <ModalHeader onClose={this.close.bind(this)}>New Transfer</ModalHeader>
        <form onSubmit={this.add.bind(this)}>
          <ModalBody>
            <fieldset className="form-group">
              <label>From Account</label>
              <select ref="fromAccountGuidSelect" className="form-control">
                {accountOptions}
              </select>
            </fieldset>

            <fieldset className="form-group">
              <label>To Account</label>
              <select ref="toAccountGuidSelect" className="form-control">
                {accountOptions}
              </select>
            </fieldset>

            <fieldset className="form-group">
              <label>Amount</label>
              <input ref="amountInput" className="form-control" type="text" />
            </fieldset>

            <fieldset className="form-group">
              <label>Date</label>
              <input ref="dateInput" className="form-control" type="text" />
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
