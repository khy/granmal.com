var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput } from 'budget/client/lib/date'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class PlannedTxn extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const plannedTxn = {
      accountGuid: this.props.accountGuid,
      transactionTypeGuid: this.refs.txnTypeGuidSelect.value,
      minAmount: parseFloat(this.refs.minAmountInput.value),
      maxAmount: parseFloat(this.refs.maxAmountInput.value),
      minDate: normalizeDateInput(this.refs.minDateInput.value),
      maxDate: normalizeDateInput(this.refs.maxDateInput.value)
    }

    this.props.onAdd(plannedTxn)
  }

  onNewTxnType(event) {
    event.preventDefault()
    alert("IMPLEMENT ME!")
  }

  render() {

    const txnTypeOptions = (
      _map(this.props.app.txnTypes, (txnType) => {
        return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
      })
    )

    return (
      <Modal>
        <ModalHeader>New Planned Transaction</ModalHeader>
        <ModalBody>
          <form>
            <fieldset disabled={this.props.isFetching}>
              <fieldset className="form-group">
                <label>Transaction Type</label>
                <select ref="txnTypeGuidSelect" className="form-control">
                  {txnTypeOptions}
                </select>
                <a onClick={this.onNewTxnType.bind(this)} href="#">New Transaction Type</a>
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
