import React from 'react'
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'
import _isNaN from 'lodash/isNaN'
import _isNumber from 'lodash/isNumber'
import _isUndefined from 'lodash/isUndefined'
import _map from 'lodash/map'
import _toNumber from 'lodash/toNumber'

import { parseDateInput, formatDate, formatDateForModel } from 'budget/client/lib/date'
import { normalizeOptionalFormInput } from 'budget/client/lib/form'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import TxnTypeSelect from 'budget/client/components/TxnTypeSelect'
import TxnTypeButtonGroup from 'budget/client/components/modal/TxnTypeButtonGroup'

export default class AddPlannedTxn extends React.Component {

  constructor(props) {
    super(props)
    this.state = { rootTxnType: 'Expense', errors: {} }
  }

  get isDisabled() {
    return !this.props.isEnabled
  }

  setRootTxnType(type) {
    this.setState({rootTxnType: type})
  }

  selectTxnTypeGuid(guid) {
    this.setState({selectedTxnTypeGuid: guid})
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    let errors = {}

    if (!this.state.selectedTxnTypeGuid) {
      errors.txnType = `${this.state.rootTxnType} type is required`
    }

    const rawMinAmount = this.refs.minAmountInput.value
    let minAmount

    if (rawMinAmount.length > 0) {
      minAmount = _toNumber(rawMinAmount)

      if (_isNaN(minAmount)) {
        errors.minAmount = 'Must be a number'
      }
    }

    const rawMaxAmount = this.refs.maxAmountInput.value
    let maxAmount

    if (rawMaxAmount.length > 0) {
      maxAmount = _toNumber(rawMaxAmount)

      if (_isNaN(maxAmount)) {
        errors.maxAmount = 'Must be a number'
      }
    }

    if (_isNumber(minAmount) && _isNumber(maxAmount)) {
      if (minAmount > maxAmount) {
        errors.minAmount = "Must be less than or equal to Max Amount"
      }
    }

    const rawMinDate = this.refs.minDateInput.value
    let minDate

    if (rawMinDate.length > 0) {
      minDate = parseDateInput(rawMinDate)

      if (!minDate.isValid()) {
        errors.minDate = "Must have format MM/DD/YY"
      }
    }

    const rawMaxDate = this.refs.maxDateInput.value
    let maxDate

    if (rawMinDate.length > 0) {
      maxDate = parseDateInput(rawMaxDate)

      if (!maxDate.isValid()) {
        errors.maxDate = "Must have format MM/DD/YY"
      }
    }

    if ((minDate && minDate.isValid()) && (maxDate && maxDate.isValid())) {
      if (minDate.isAfter(maxDate)) {
        errors.minDate = "Must be before or equal to Max Date"
      }
    }

    if (_isEmpty(errors)) {
      minAmount = Math.abs(minAmount)
      maxAmount = Math.abs(maxAmount)

      if (this.state.rootTxnType === 'Expense') {
        // Yes, this is reversed on purpose - in UI, "max" / "min" refers to
        // absolute value; in API, it does not.
        [minAmount, maxAmount] = [-maxAmount, -minAmount]
      }

      const plannedTxn = {
        accountGuid: this.props.accountGuid,
        transactionTypeGuid: this.state.selectedTxnTypeGuid,
        minAmount: minAmount,
        maxAmount: maxAmount,
        minDate: formatDateForModel(minDate),
        maxDate: formatDateForModel(maxDate),
        name: normalizeOptionalFormInput(this.refs.nameInput.value)
      }

      this.props.onAdd(plannedTxn)
    } else {
      this.setState({ errors })
    }
  }

  render() {
    let inlineError = (key) => <span className="text-danger">{this.state.errors[key]}</span>

    let amountInputAddon

    if (this.state.rootTxnType === 'Expense') {
      amountInputAddon = <span className="input-group-addon text-danger">&#45;</span>
    } else {
      amountInputAddon = <span className="input-group-addon text-success">&#43;</span>
    }

    return (
      <Modal>
        <ModalHeader>New Planned Transaction</ModalHeader>
        <ModalBody>
          <TxnTypeButtonGroup
            txnType={this.state.rootTxnType}
            onClick={this.setRootTxnType.bind(this)}
          />

          <form>
            <fieldset disabled={this.isDisabled}>
              <fieldset className="form-group">
                <label>{this.state.rootTxnType} Type</label>
                <TxnTypeSelect
                  rootTxnType={this.state.rootTxnType}
                  txnTypes={this.props.txnTypes}
                  value={this.state.selectedTxnTypeGuid}
                  onChange={this.selectTxnTypeGuid.bind(this)}
                />

                {inlineError('txnType')}
              </fieldset>

              <div className="row">
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Min Amount</label>
                      <div className="input-group">
                        {amountInputAddon}
                        <input ref="minAmountInput" className="form-control" type="text" />
                      </div>

                      {inlineError('minAmount')}
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Max Amount</label>
                      <div className="input-group">
                        {amountInputAddon}
                        <input ref="maxAmountInput" className="form-control" type="text" />
                      </div>

                      {inlineError('maxAmount')}
                  </fieldset>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Min Date</label>
                    <input ref="minDateInput" defaultValue={formatDate(moment())} className="form-control" type="text" />

                    {inlineError('minDate')}
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Max Date</label>
                    <input ref="maxDateInput" type="text" defaultValue={formatDate(moment())} className="form-control" />

                    {inlineError('maxDate')}
                  </fieldset>
                </div>
              </div>

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
