import React from 'react'

import { PrimaryButton, SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

import { normalizeDateInput } from 'budget/client/lib/date'
import TxnTypeSelect from 'budget/client/components/TxnTypeSelect'

export default class NewTxn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newTxn = {
      accountGuid: this.props.accountGuid,
      transactionTypeGuid: this.state.selectedTxnTypeGuid,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value)
    }

    this.props.onAdd(newTxn)
  }

  onNewTxnType(event) {
    event.preventDefault()
    this.props.onNewTxnType()
  }

  selectTxnTypeGuid(guid) {
    this.setState({selectedTxnTypeGuid: guid})
  }

  render() {
    return (
      <Modal>
        <ModalHeader>New Transaction</ModalHeader>
        <ModalBody>
          <form>
            <fieldset disabled={this.props.isFetching}>
              <fieldset className="form-group">
                <label>Transaction Type</label>
                <TxnTypeSelect
                  txnTypes={this.props.app.txnTypes}
                  value={this.state.selectedTxnTypeGuid}
                  onChange={this.selectTxnTypeGuid.bind(this)}
                />
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
