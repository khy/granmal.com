var React = require('react')
import { Link } from 'react-router'
var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { UserActionTypes } from 'budget/client/actions/overview'
import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'

class PlannedTxnsCard extends React.Component {

  onResolve(event) {
    event.preventDefault()

    var plannedTxn = _find(this.props.plannedTxns, (plannedTxn) => {
      return plannedTxn.guid === event.target.dataset.guid
    })

    this.props.onResolve(plannedTxn)
  }

  render() {
    let rows

    if (Object.keys(this.props.plannedTxns).length > 0) {
      rows = _map(this.props.plannedTxns, (plannedTxn) => {
        const minDate = formatDate(plannedTxn.minDate)
        const maxDate = formatDate(plannedTxn.maxDate)
        const date = (minDate === maxDate) ?
          minDate : minDate + " / " + maxDate

        const amount = (plannedTxn.minAmount === plannedTxn.maxAmount) ?
          plannedTxn.minAmount : plannedTxn.minAmount +  " / " + plannedTxn.maxAmount

        const rowClass = (moment(plannedTxn.minDate) < moment()) ?
          'table-warning' : ''

        const txnType = _find(this.props.app.txnTypes, (txnType) => {
          return txnType.guid === plannedTxn.transactionTypeGuid
        })

        const account = _find(this.props.app.accounts, (account) => {
          return account.guid === plannedTxn.accountGuid
        })

        return (
          <tr key={plannedTxn.guid} className={rowClass}>
            <td>{shortenGuid(plannedTxn.guid)}</td>
            <td>{date}</td>
            <td>{amount}</td>
            <td>{txnType.name}</td>
            <td>{account.name}</td>
            <td><a onClick={this.onResolve.bind(this)} data-guid={plannedTxn.guid} href="#">Resolve</a></td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="6" className="text-center text-muted">No Planned Transactions</td>
        </tr>
      )
    }


    let message

    if (this.props.lastUserAction) {
      if (this.props.lastUserAction.type === UserActionTypes.ConfirmPlannedTxn) {
        message = (
          <div className="card-block">
            <p className="card-text text-success">
              Confirm planned transaction <strong>{shortenGuid(this.props.lastUserAction.plannedTxnGuid)}</strong>.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.DeletePlannedTxn) {
        message = (
          <div className="card-block">
            <p className="card-text text-danger">
              Deleted planned transaction <strong>{shortenGuid(this.props.lastUserAction.guid)}</strong>.
            </p>
          </div>
        )
      }
    }

    return (
      <div className="card">
        <div className="card-header">
          Planned Transactions
          <Link to="/budget/plannedTransactions" className="pull-right">All</Link>
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

module.exports = PlannedTxnsCard
