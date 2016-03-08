import React from 'react'
import _map from 'lodash/collection/map'

import { Button, PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'

export default class ResolvePlannedTxn extends React.Component {

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
      plannedTransactionGuid: this.props.plannedTxn.guid
    }

    this.props.onAddNew(txn)
  }

  delete(event) {
    event.preventDefault()
    this.props.onDelete(this.props.plannedTxn.guid)
  }

  render() {

    const txnTypeOptions = (
      _map(this.props.txnTypes, (txnType) => {
        return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
      })
    )

    const plannedTxn = this.props.plannedTxn
    const defaultDate = formatDate(plannedTxn.minDate)

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
            defaultValue={plannedTxn.accountGuid}
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
            <fieldset disabled={this.props.isFetching}>
              <fieldset className="form-group">
                <label>Transaction Type</label>
                <select
                  className="form-control"
                  ref="txnTypeGuidSelect"
                  defaultValue={plannedTxn.transactionTypeGuid}
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
                  defaultValue={plannedTxn.minAmount}
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
            disabled={this.props.isFetching}
          >
            Delete
          </Button>
          <SecondaryButton
            onClick={this.close.bind(this)}
            disabled={this.props.isFetching}
          >
            Close
          </SecondaryButton>
          <PrimaryButton
            onClick={this.addNew.bind(this)}
            disabled={this.props.isFetching}
          >
            Add
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
