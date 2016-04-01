import React from 'react'
import _map from 'lodash/map'

import { normalizeDateInput } from 'budget/client/lib/date'
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

    const plannedTxn = {
      accountGuid: this.props.accountGuid,
      transactionTypeGuid: this.state.selectedTxnTypeGuid,
      minAmount: parseFloat(this.refs.minAmountInput.value),
      maxAmount: parseFloat(this.refs.maxAmountInput.value),
      minDate: normalizeDateInput(this.refs.minDateInput.value),
      maxDate: normalizeDateInput(this.refs.maxDateInput.value)
    }

    this.props.onAdd(plannedTxn)
  }

  render() {
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
              </fieldset>

              <div className="row">
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Min Amount</label>
                    <input ref="minAmountInput" className="form-control" type="text" />
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Max Amount</label>
                    <input ref="maxAmountInput" className="form-control" type="text" />
                  </fieldset>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Min Date</label>
                    <input ref="minDateInput" className="form-control" type="text" />
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <fieldset className="form-group">
                    <label>Max Date</label>
                    <input ref="maxDateInput" className="form-control" type="text" />
                  </fieldset>
                </div>
              </div>
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
