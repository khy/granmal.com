import React from 'react'
import _map from 'lodash/map'

import { Button, PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'

export default class ResolvePlannedTxn extends React.Component {

  get plannedTxn() {
    return this.props.data.plannedTxn
  }

  get isDisabled() {
    return !this.props.isEnabled
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  addNew(event) {
    event.preventDefault()

    const accountGuid = (this.props.fixedAccount) ?
      this.props.fixedAccount.guid :
      this.refs.accountGuidSelect.value

    const txn = {
      transactionTypeGuid: this.refs.txnTypeGuidSelect.value,
      accountGuid: accountGuid,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value),
      plannedTransactionGuid: this.plannedTxn.guid
    }

    this.props.onAddNew(txn)
  }

  delete(event) {
    event.preventDefault()
    this.props.onDelete(this.plannedTxn.guid)
  }

  render() {

    const txnTypeOptions = (
      _map(this.props.txnTypes, (txnType) => {
        return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
      })
    )

    const defaultDate = formatDate(this.plannedTxn.minDate)

    let accountFieldSet

    if (!this.props.fixedAccount) {
      const accountOptions = (
        _map(this.props.accounts, (account) => {
          return <option value={account.guid} key={account.guid}>{account.name}</option>
        })
      )

      accountFieldSet = (
        <fieldset className="form-group">
          <label>Account</label>
          <select
            className="form-control"
            ref="accountGuidSelect"
            defaultValue={this.plannedTxn.accountGuid}
          >
            {accountOptions}
          </select>
        </fieldset>
      )
    }

    return (
      <Modal>
        <ModalHeader>Resolve Planned Transaction</ModalHeader>
        <ModalBody>
          <form>
            <fieldset disabled={this.isDisabled}>
              <fieldset className="form-group">
                <label>Transaction Type</label>
                <select
                  className="form-control"
                  ref="txnTypeGuidSelect"
                  defaultValue={this.plannedTxn.transactionTypeGuid}
                >
                  {txnTypeOptions}
                </select>
              </fieldset>

              {accountFieldSet}

              <fieldset className="form-group">
                <label>Amount</label>
                <input
                  className="form-control"
                  type="text"
                  ref="amountInput"
                  defaultValue={this.plannedTxn.minAmount}
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
            onClick={this.addNew.bind(this)}
            disabled={this.isDisabled}
          >
            Add
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
