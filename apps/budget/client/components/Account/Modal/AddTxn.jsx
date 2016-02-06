var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput } from 'budget/client/lib/date'
import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class NewTxn extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newTxn = {
      accountGuid: this.props.accountGuid,
      transactionTypeGuid: this.refs.txnTypeGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value)
    }

    this.props.onAdd(newTxn)
  }

  onNewTxnType(event) {
    event.preventDefault()
    this.props.onNewTxnType()
  }

  render() {

    const txnTypeOptions = (
      _map(this.props.app.txnTypes, (txnType) => {
        return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
      })
    )

    return (
      <Modal>
        <ModalHeader>New Transaction</ModalHeader>
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

              <fieldset className="form-group">
                <label>Amount</label>
                <input ref="amountInput" className="form-control" type="text" />
              </fieldset>

              <fieldset className="form-group">
                <label>Date</label>
                <input ref="dateInput" className="form-control" type="text" />
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
