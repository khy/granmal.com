var React = require('react')
var moment = require('moment')
var _map = require('lodash/collection/map')
var model = require('client/model')

class AdjustTxnModal extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  adjust(event) {
    event.preventDefault()

    const transaction = {
      transactionTypeGuid: this.refs.transactionTypeGuidSelect.value,
      accountGuid: this.refs.accountGuidSelect.value,
      amount: parseInt(this.refs.amountInput.value),
      timestamp: moment(this.refs.timestampInput.value, ['MM|DD|YY']).format()
    }

    model.call('transactions.adjust', [this.props.txn.guid, transaction], [['guid']]).then(
      response => this.props.onAdjust(response.json.transactions.latest.guid)
    )
  }

  delete(event) {
    event.preventDefault()

    model.call('transactions.delete', [this.props.txn.guid]).then(
      response => this.props.onDelete(this.props.txn.guid)
    )
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

    var txn = this.props.txn
    var defaultDate = moment(txn.timestamp).format('MM/DD/YYYY')

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
                <h4 className="modal-title">Adjust Transaction</h4>
              </div>
              <div className="modal-body">
                <form>
                  <fieldset className="form-group">
                    <label>Transaction Type</label>
                    <select
                      className="form-control"
                      ref="transactionTypeGuidSelect"
                      defaultValue={txn.transactionType.guid}
                    >
                      {transactionTypeOptions}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Account</label>
                    <select
                      className="form-control"
                      ref="accountGuidSelect"
                      defaultValue={txn.account.guid}
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
                      defaultValue={txn.amount}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Date</label>
                    <input
                      className="form-control"
                      type="text"
                      ref="timestampInput"
                      defaultValue={defaultDate}
                    />
                  </fieldset>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger-outline pull-left" onClick={this.delete.bind(this)}>Delete</button>
                <button type="button" className="btn btn-secondary" onClick={this.close.bind(this)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.adjust.bind(this)}>Adjust</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = AdjustTxnModal
