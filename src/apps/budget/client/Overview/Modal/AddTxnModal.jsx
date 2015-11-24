var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput } from 'budget/client/lib/date'

class AddTxnModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newTxn = {
      transactionTypeGuid: this.refs.txnTypeGuidSelect.value,
      accountGuid: this.refs.accountGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      timestamp: normalizeDateInput(this.refs.timestampInput.value)
    }

    this.props.onAdd(newTxn)
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
                <h4 className="modal-title">New Transaction</h4>
              </div>
              <div className="modal-body">
                <form>
                  <fieldset disabled={this.props.isFetching}>
                    <fieldset className="form-group">
                      <label>Transaction Type</label>
                      <select ref="txnTypeGuidSelect" className="form-control">
                        {txnTypeOptions}
                      </select>
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Account</label>
                      <select ref="accountGuidSelect" className="form-control">
                        {accountOptions}
                      </select>
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Amount</label>
                      <input ref="amountInput" className="form-control" type="text" />
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Date</label>
                      <input ref="timestampInput" className="form-control" type="text" />
                    </fieldset>
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

module.exports = AddTxnModal
