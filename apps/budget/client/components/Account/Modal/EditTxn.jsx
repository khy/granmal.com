import React from 'react'
import _map from 'lodash/collection/map'

import { Button, PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'

export default class EditTxn extends React.Component {

  get txn() {
    return this.props.data.txn
  }

  get isDisabled() {
    return !this.props.isEnabled
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  edit(event) {
    event.preventDefault()

    const attrs = {
      transactionTypeGuid: this.refs.txnTypeGuidSelect.value,
      accountGuid: this.refs.accountGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value)
    }

    this.props.onEdit(this.txn, attrs)
  }

  delete(event) {
    event.preventDefault()
    this.props.onDelete(this.txn)
  }

  render() {

    const txnTypeOptions = (
      _map(this.props.app.txnTypes, (txnType) => {
        return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
      })
    )

    const accountOptions = (
      _map(this.props.app.accounts, (account) => {
        return <option value={account.guid} key={account.guid}>{account.name}</option>
      })
    )

    var defaultDate = formatDate(this.txn.date)

    return (
      <Modal>
        <ModalHeader>New Planned Transaction</ModalHeader>
        <ModalBody>
          <form>
            <fieldset disabled={this.isDisabled}>
              <fieldset className="form-group">
                <label>Transaction Type</label>
                <select
                  className="form-control"
                  ref="txnTypeGuidSelect"
                  defaultValue={this.txn.transactionTypeGuid}
                >
                  {txnTypeOptions}
                </select>
              </fieldset>

              <fieldset className="form-group">
                <label>Account</label>
                <select
                  className="form-control"
                  ref="accountGuidSelect"
                  defaultValue={this.txn.accountGuid}
                >
                  {accountOptions}
                </select>
              </fieldset>

              <fieldset className="form-group">
                <label>Amount</label>
                <input
                  className="form-control"
                  type="text"
                  ref="amountInput"
                  defaultValue={this.txn.amount}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Date</label>
                <input
                  className="form-control"
                  type="text"
                  ref="dateInput"
                  defaultValue={defaultDate}
                />
              </fieldset>
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-danger-outline pull-left"
            onClick={this.delete.bind(this)}
            disabled={this.isDisabled}
          >
            Delete
          </Button>
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
