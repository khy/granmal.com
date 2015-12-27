var React = require('react')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { UserActionTypes } from 'budget/client/actions'
import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'

class TxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onAdjust(event) {
    event.preventDefault()
    var txn = _find(this.props.txns, (txn) => {
      return txn.guid === event.target.dataset.guid
    })
    this.props.onAdjust(txn)
  }

  render() {
    let rows

    if (Object.keys(this.props.txns).length > 0) {
      rows = _map(this.props.txns, (value, key) => {
        return (
          <tr key={value.guid}>
            <td>{shortenGuid(value.guid)}</td>
            <td>{formatDate(value.date)}</td>
            <td>{value.amount}</td>
            <td>{value.transactionType.name}</td>
            <td>{value.account.name}</td>
            <td><a onClick={this.onAdjust.bind(this)} data-guid={value.guid} href="#">Adjust</a></td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="6" className="text-center text-muted">No Transactions</td>
        </tr>
      )
    }

    let message

    if (this.props.lastUserAction) {
      if (this.props.lastUserAction.type === UserActionTypes.AddTxn) {
        message = (
          <div className="card-block">
            <p className="card-text text-success">
              Added transaction <strong>{shortenGuid(this.props.lastUserAction.guid)}</strong>.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.ConfirmPlannedTxn) {
        message = (
          <div className="card-block">
            <p className="card-text text-success">
              Added transaction <strong>{shortenGuid(this.props.lastUserAction.txnGuid)}</strong>.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.AdjustTxn) {
        message = (
          <div className="card-block">
            <p className="card-text text-success">
              Adjusted transaction <strong>{shortenGuid(this.props.lastUserAction.oldGuid)}</strong>,
              adding transaction <strong>{shortenGuid(this.props.lastUserAction.newGuid)}</strong>.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.DeleteTxn) {
        message = (
          <div className="card-block">
            <p className="card-text text-danger">
              Deleted transaction <strong>{shortenGuid(this.props.lastUserAction.guid)}</strong>.
            </p>
          </div>
        )
      }
    }

    return (
      <div className="card">
        <div className="card-header">
          Transactions
          <a className="pull-right" href="#" onClick={this.onNew.bind(this)}>
            New Transaction
          </a>
        </div>
        {message}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Account</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}

module.exports = TxnsCard
