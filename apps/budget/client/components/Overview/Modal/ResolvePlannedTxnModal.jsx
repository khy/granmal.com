var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput, formatDate } from 'budget/client/lib/date'

class ResolvePlannedTxnModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  confirm(event) {
    event.preventDefault()

    const txn = {
      transactionTypeGuid: this.refs.txnTypeGuidSelect.value,
      accountGuid: this.refs.accountGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value),
      plannedTransactionGuid: this.props.plannedTxn.guid
    }

    this.props.onConfirm(txn)
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

    const accountOptions = (
      _map(this.props.accounts, (account) => {
        return <option value={account.guid} key={account.guid}>{account.name}</option>
      })
    )

    var plannedTxn = this.props.plannedTxn
    var defaultDate = formatDate(plannedTxn.minDate)

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
                <h4 className="modal-title">Resolve Planned Transaction</h4>
              </div>
              <div className="modal-body">
                <form>
                  <fieldset disabled={this.props.isFetching}>
                    <fieldset className="form-group">
                      <label>Transaction Type</label>
                      <select
                        className="form-control"
                        ref="txnTypeGuidSelect"
                        defaultValue={plannedTxn.txnType.guid}
                      >
                        {txnTypeOptions}
                      </select>
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Account</label>
                      <select
                        className="form-control"
                        ref="accountGuidSelect"
                        defaultValue={plannedTxn.account.guid}
                      >
                        {accountOptions}
                      </select>
                    </fieldset>

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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger-outline pull-left"
                  onClick={this.delete.bind(this)}
                  disabled={this.props.isFetching}
                >
                  Delete
                </button>
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
                  onClick={this.confirm.bind(this)}
                  disabled={this.props.isFetching}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = ResolvePlannedTxnModal
