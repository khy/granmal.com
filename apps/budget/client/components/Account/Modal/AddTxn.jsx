import React from 'react'
import moment from 'moment'
import _isEmpty from 'lodash/lang/isEmpty'

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'
import TxnTypeSelect from 'budget/client/components/TxnTypeSelect'

export default class NewTxn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {rootTxnType: 'expense', errors: {}}
  }

  setExpense() {
    this.setState({rootTxnType: 'expense'})
  }

  setIncome() {
    this.setState({rootTxnType: 'income'})
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    let errors = {}

    if (!this.state.selectedTxnTypeGuid) {
      if (this.state.rootTxnType === 'expense') {
        errors.txnType = "Expense type is required"
      } else {
        errors.txnType = "Income type is required"
      }
    }

    if (!this.refs.amountInput.value) {
      errors.amount = "Amount is required"
    }

    if (!this.refs.dateInput.value) {
      errors.date = "Date is required"
    }

    if (_isEmpty(errors)) {
      let amount = Math.abs(parseFloat(this.refs.amountInput.value))

      if (this.state.rootTxnType === 'expense') {
        amount = - amount
      }

      const newTxn = {
        accountGuid: this.props.accountGuid,
        transactionTypeGuid: this.state.selectedTxnTypeGuid,
        amount: amount,
        date: normalizeDateInput(this.refs.dateInput.value)
      }

      this.props.onAdd(newTxn)
    } else {
      this.setState({ errors })
    }
  }

  onNewTxnType(event) {
    event.preventDefault()
    this.props.onNewTxnType()
  }

  selectTxnTypeGuid(guid) {
    this.setState({selectedTxnTypeGuid: guid})
  }

  render() {
    const expenseButtonState = (this.state.rootTxnType === 'expense') ? 'active' : false
    const incomeButtonState = (this.state.rootTxnType === 'income') ? 'active' : false

    const selectLabel = (this.state.rootTxnType === 'expense') ? 'Expense Type' : 'Income Type'

    let amountInput

    if (this.state.rootTxnType === 'expense') {
      amountInput = <div className="input-group">
        <span className="input-group-addon text-danger">&#45;</span>
        <input ref="amountInput" type="text" className="form-control" />
      </div>
    } else {
      amountInput = <div className="input-group">
        <span className="input-group-addon text-success">&#43;</span>
        <input ref="amountInput" type="text" className="form-control" />
      </div>
    }

    let txnTypeError, amountError, dateError

    if (this.state.errors.txnType) {
      txnTypeError = <span className="text-danger">{this.state.errors.txnType}</span>
    }

    if (this.state.errors.amount) {
      amountError = <span className="text-danger">{this.state.errors.amount}</span>
    }

    if (this.state.errors.date) {
      dateError = <span className="text-danger">{this.state.errors.date}</span>
    }

    return (
      <Modal>
        <ModalHeader>New Transaction</ModalHeader>
        <ModalBody>
          <div className="btn-group transaction-type-buttons">
            <SecondaryButton
              className={expenseButtonState}
              disabled={this.state.rootTxnType === 'expense'}
              onClick={this.setExpense.bind(this)}
            >
              Expense
            </SecondaryButton>
            <SecondaryButton
              className={incomeButtonState}
              disabled={this.state.rootTxnType === 'income'}
              onClick={this.setIncome.bind(this)}
            >
              Income
            </SecondaryButton>
          </div>
          <form>
            <fieldset disabled={this.props.isFetching}>
              <fieldset className="form-group">
                <label>{selectLabel}</label>
                <TxnTypeSelect
                  rootTxnType={this.state.rootTxnType}
                  txnTypes={this.props.app.txnTypes}
                  value={this.state.selectedTxnTypeGuid}
                  onChange={this.selectTxnTypeGuid.bind(this)}
                />
                {txnTypeError}
              </fieldset>

              <fieldset className="form-group">
                <label>Amount</label>
                {amountInput}
                {amountError}
              </fieldset>

              <fieldset className="form-group">
                <label>Date</label>
                <input ref="dateInput" className="form-control" type="text" defaultValue={formatDate(moment())} />
                {dateError}
            </fieldset>
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <SecondaryButton
            onClick={this.close.bind(this)}
            disabled={this.props.isFetching}
          >
            Close
          </SecondaryButton>
          <PrimaryButton
            onClick={this.add.bind(this)}
            disabled={this.props.isFetching}
          >
            Add
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
