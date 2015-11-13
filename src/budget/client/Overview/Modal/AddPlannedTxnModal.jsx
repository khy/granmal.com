var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput } from 'budget/client/lib/date'

class AddPlannedTxnModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const plannedTransaction = {
      transactionTypeGuid: this.refs.transactionTypeGuidSelect.value,
      accountGuid: this.refs.accountGuidSelect.value,
      minAmount: parseFloat(this.refs.minAmountInput.value),
      maxAmount: parseFloat(this.refs.maxAmountInput.value),
      minTimestamp: normalizeDateInput(this.refs.minTimestampInput.value),
      maxTimestamp: normalizeDateInput(this.refs.maxTimestampInput.value)
    }

    this.props.onAdd(plannedTransaction)
  }

  render() {

    const transactionTypeOptions = (
      _map(this.props.transactionTypes, (transactionType) => {
        return <option value={transactionType.guid} key={transactionType.guid}>{transactionType.name}</option>
      })
    )

    const accountOptions = (
      _map(this.props.accounts, (account) => {
        return <option value={account.guid} key={account.guid}>{account.name}</option>
      })
    )

    return (
      <div>
        <div className="modal-backdrop in" onClick={this.close.bind(this)}></div>
        <div className="modal" style={{display: 'block', paddingLeft: '0px'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" type="button" onClick={this.close.bind(this)}>
                  <span>&times;</span>
                </button>
                <h4 className="modal-title">New Planned Transaction</h4>
              </div>
              <div className="modal-body">
                <form>
                  <fieldset disabled={this.props.isFetching}>
                    <fieldset className="form-group">
                      <label>Transaction Type</label>
                      <select ref="transactionTypeGuidSelect" className="form-control">
                        {transactionTypeOptions}
                      </select>
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Account</label>
                      <select ref="accountGuidSelect" className="form-control">
                        {accountOptions}
                      </select>
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
                          <input ref="minTimestampInput" className="form-control" type="text" />
                        </fieldset>
                      </div>
                      <div className="col-md-6">
                        <fieldset className="form-group">
                          <label>Max Date</label>
                          <input ref="maxTimestampInput" className="form-control" type="text" />
                        </fieldset>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.close.bind(this)}
                  disabled={this.props.isFetching}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.add.bind(this)}
                  disabled={this.props.isFetching}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = AddPlannedTxnModal
