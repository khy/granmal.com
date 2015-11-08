var React = require('react')
var moment = require('moment')
var _map = require('lodash/collection/map')

class AddTxnModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const newTransaction = {
      transactionTypeGuid: this.refs.transactionTypeGuidSelect.value,
      accountGuid: this.refs.accountGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      timestamp: moment(this.refs.timestampInput.value, ['MM|DD|YY']).format()
    }

    this.props.onAdd(newTransaction)
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
                <h4 className="modal-title">New Transaction</h4>
              </div>
              <div className="modal-body">
                <form>
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

                  <fieldset className="form-group">
                    <label>Amount</label>
                    <input ref="amountInput" className="form-control" type="text" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Date</label>
                    <input ref="timestampInput" className="form-control" type="text" />
                  </fieldset>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.close.bind(this)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.add.bind(this)}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = AddTxnModal
