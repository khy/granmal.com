import React from 'react'
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'

import Select from 'react-select'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'
import { unformatCurrency } from 'budget/client/lib/currency'
import { rootTxnType } from 'budget/client/lib/txnType'
import TxnTypeSelect from 'budget/client/components/TxnTypeSelect'
import TxnTypeButtonGroup from 'budget/client/components/modal/TxnTypeButtonGroup'

export default class AddTxn extends React.Component {

  constructor(props) {
    super(props)

    let _rootTxnType

    if (this.props.txnTypeGuid) {
      _rootTxnType = rootTxnType(this.props.txnTypes, this.props.txnTypeGuid).name
    } else {
      _rootTxnType = 'Expense'
    }

    let _amount

    if (this.props.initialAmount) {
      _amount = Math.abs(parseFloat(unformatCurrency(this.props.initialAmount)))
    }

    this.state = {
      rootTxnType: _rootTxnType,
      accountGuid: (this.props.accountGuid || this.props.initialAccountGuid),
      txnTypeGuid: (this.props.txnTypeGuid || this.props.initialTxnTypeGuid),
      amount: _amount,
      date: formatDate(moment(this.props.initialDate)),
      name: (this.props.initialName),
      errors: {}
    }
  }

  get isDisabled() {
    return !this.props.isEnabled
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    let errors = {}

    if (!this.state.accountGuid) {
      errors.accountGuid = "Account is required"
    }

    if (!this.state.txnTypeGuid) {
      errors.txnType = `${this.state.rootTxnType} type is required`
    }

    if (!this.state.amount) {
      errors.amount = "Amount is required"
    }

    if (!this.state.date) {
      errors.date = "Date is required"
    }

    if (_isEmpty(errors)) {
      let amount = Math.abs(parseFloat(unformatCurrency(this.state.amount)))

      if (this.state.rootTxnType === 'Expense') {
        amount = - amount
      }

      const newTxn = {
        accountGuid: this.state.accountGuid,
        transactionTypeGuid: this.state.txnTypeGuid,
        amount: amount,
        date: normalizeDateInput(this.state.date),
        name: this.state.name,
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

  setRootTxnType(type) {
    this.setState({rootTxnType: type})
  }

  selectAccount(option) {
    const guid = option ? option.value : undefined
    this.setState({accountGuid: guid})
  }

  selectTxnTypeGuid(guid) {
    this.setState({txnTypeGuid: guid})
  }

  setAmount(event) {
    this.setState({amount: event.target.value});
  }

  setDate(event) {
    this.setState({date: event.target.value});
  }

  setName(event) {
    this.setState({name: event.target.value});
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
            value={this.state.accountGuid}
            onChange={this.selectAccount.bind(this)}
          />
          {error}
        </fieldset>
      )
    }

    let txnTypeButtonGroup, txnTypeFieldset

    if (!this.props.txnTypeGuid) {
      txnTypeButtonGroup = (
        <TxnTypeButtonGroup
          txnType={this.state.rootTxnType}
          onClick={this.setRootTxnType.bind(this)}
        />
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
            value={this.state.txnTypeGuid}
            onChange={this.selectTxnTypeGuid.bind(this)}
          />
          {error}
        </fieldset>
      )
    }

    let amountInputAddon

    if (this.state.rootTxnType === 'Expense') {
      amountInputAddon = <span className="input-group-addon text-danger">&#45;</span>
    } else {
      amountInputAddon = <span className="input-group-addon text-success">&#43;</span>
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
        <ModalHeader onClose={this.close.bind(this)}>New Transaction</ModalHeader>
        <form onSubmit={this.add.bind(this)}>
          <ModalBody>
            {txnTypeButtonGroup}

            <fieldset disabled={this.isDisabled}>
              {accountFieldset}

              {txnTypeFieldset}

              <fieldset className="form-group">
                <label>Amount</label>
                <div className="input-group">
                  {amountInputAddon}
                  <input value={this.state.amount} onChange={this.setAmount.bind(this)} className="form-control" type="text" />
                </div>
                {amountError}
              </fieldset>

              <fieldset className="form-group">
                <label>Date</label>
                <input value={this.state.date} onChange={this.setDate.bind(this)} className="form-control" type="text" />
                {dateError}
              </fieldset>

              <fieldset className="form-group">
                <label>Name</label>
                <input value={this.state.name} onChange={this.setName.bind(this)} className="form-control" type="text" />
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
