import React from 'react'
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'

import Select from 'react-select'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'
import { rootTxnType } from 'budget/client/lib/txnType'
import TxnTypeSelect from 'budget/client/components/TxnTypeSelect'

export default class AddTxn extends React.Component {

  constructor(props) {
    super(props)

    let _rootTxnType

    if (this.props.txnTypeGuid) {
      _rootTxnType = rootTxnType(this.props.txnTypes, this.props.txnTypeGuid).name
    } else {
      _rootTxnType = 'Expense'
    }

    this.state = { rootTxnType: _rootTxnType, errors: {} }
  }

  get isDisabled() {
    return !this.props.isEnabled
  }

  setExpense() {
    this.setState({rootTxnType: 'Expense'})
  }

  setIncome() {
    this.setState({rootTxnType: 'Income'})
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    let errors = {}

    const accountGuid = this.state.selectedAccountGuid || this.props.accountGuid

    if (!accountGuid) {
      errors.accountGuid = "Account is required"
    }

    const txnTypeGuid = this.state.selectedTxnTypeGuid || this.props.txnTypeGuid

    if (!txnTypeGuid) {
      errors.txnType = `${this.state.rootTxnType} type is required`
    }

    if (!this.refs.amountInput.value) {
      errors.amount = "Amount is required"
    }

    if (!this.refs.dateInput.value) {
      errors.date = "Date is required"
    }

    if (_isEmpty(errors)) {
      let amount = Math.abs(parseFloat(this.refs.amountInput.value))

      if (this.state.rootTxnType === 'Expense') {
        amount = - amount
      }

      const newTxn = {
        accountGuid: accountGuid,
        transactionTypeGuid: txnTypeGuid,
        amount: amount,
        date: normalizeDateInput(this.refs.dateInput.value),
        name: this.refs.nameInput.value,
        plannedTransactionGuid: this.props.plannedTxnGuid
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

  selectAccount(option) {
    const guid = option ? option.value : undefined
    this.setState({selectedAccountGuid: guid})
  }

  selectTxnTypeGuid(guid) {
    this.setState({selectedTxnTypeGuid: guid})
  }

  render() {
    let accountFieldset

    if (!this.props.accountGuid) {
      const options = (
        _map(this.props.accounts, (account) => {
          return { value: account.guid, label: account.name }
        })
      )

      let error

      if (this.state.errors.accountGuid) {
        error = <span className="text-danger">{this.state.errors.accountGuid}</span>
      }

      accountFieldset = (
        <fieldset className="form-group">
          <label>Account</label>
          <Select
            name="fromAccountGuidSelect"
            options={options}
            value={this.state.selectedAccountGuid}
            onChange={this.selectAccount.bind(this)}
          />
          {error}
        </fieldset>
      )
    }

    let txnTypeButtonGroup, txnTypeFieldset

    if (!this.props.txnTypeGuid) {
      const expenseButtonState = (this.state.rootTxnType === 'Expense') ? 'active' : false
      const incomeButtonState = (this.state.rootTxnType === 'Income') ? 'active' : false

      txnTypeButtonGroup = (
        <div className="btn-group transaction-type-buttons">
          <SecondaryButton
            className={expenseButtonState}
            disabled={this.state.rootTxnType === 'Expense'}
            onClick={this.setExpense.bind(this)}
          >
            Expense
          </SecondaryButton>
          <SecondaryButton
            className={incomeButtonState}
            disabled={this.state.rootTxnType === 'Income'}
            onClick={this.setIncome.bind(this)}
          >
            Income
          </SecondaryButton>
        </div>
      )

      let error

      if (this.state.errors.txnType) {
        error = <span className="text-danger">{this.state.errors.txnType}</span>
      }

      txnTypeFieldset = (
        <fieldset className="form-group">
          <label>{this.state.rootTxnType} Type</label>
          <TxnTypeSelect
            rootTxnType={this.state.rootTxnType}
            txnTypes={this.props.txnTypes}
            value={this.state.selectedTxnTypeGuid}
            onChange={this.selectTxnTypeGuid.bind(this)}
          />
          {error}
        </fieldset>
      )
    }

    let amountInput

    if (this.state.rootTxnType === 'Expense') {
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

    let amountError, dateError

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
          {txnTypeButtonGroup}

          <form>
            <fieldset disabled={this.isDisabled}>
              {accountFieldset}

              {txnTypeFieldset}

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
            disabled={this.isDisabled}
          >
            Close
          </SecondaryButton>
          <PrimaryButton
            onClick={this.add.bind(this)}
            disabled={this.isDisabled}
          >
            Add
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
