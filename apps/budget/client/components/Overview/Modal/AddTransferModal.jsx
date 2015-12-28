var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput } from 'budget/client/lib/date'

export default class AddTransferModal extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  add(event) {
    event.preventDefault()

    const transfer = {
      fromAccountGuid: this.refs.fromAccountGuidSelect.value,
      toAccountGuid: this.refs.toAccountGuidSelect.value,
      amount: parseFloat(this.refs.amountInput.value),
      date: normalizeDateInput(this.refs.dateInput.value),
    }

    this.props.onAdd(transfer)
  }

  render() {

    const accountOptions = (
      _map(this.props.app.accounts, (account) => {
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
                <h4 className="modal-title">New Transfer</h4>
              </div>
              <div className="modal-body">
                <form>
                  <fieldset className="form-group">
                    <label>From Account</label>
                    <select ref="fromAccountGuidSelect" className="form-control">
                      {accountOptions}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <label>To Account</label>
                    <select ref="toAccountGuidSelect" className="form-control">
                      {accountOptions}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Amount</label>
                    <input ref="amountInput" className="form-control" type="text" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Date</label>
                    <input ref="dateInput" className="form-control" type="text" />
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
