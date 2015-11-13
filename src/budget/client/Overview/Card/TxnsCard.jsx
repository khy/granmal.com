var React = require('react')
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { UserActionTypes } from 'client/actions'

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
    var rows = _map(this.props.txns, (value, key) => {
      return (
        <tr key={value.guid}>
          <td>{moment(value.timestamp).format('MM/DD/YY')}</td>
          <td>{value.amount}</td>
          <td>{value.transactionType.name}</td>
          <td>{value.account.name}</td>
          <td><a onClick={this.onAdjust.bind(this)} data-guid={value.guid} href="#">Adjust</a></td>
        </tr>
      )
    })

    let message

    if (this.props.lastUserAction) {
      if (this.props.lastUserAction.type === UserActionTypes.AddTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.AddTxn}>
            <p className="card-text text-success">
              Added transaction {this.props.lastUserAction.guid}.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.ConfirmPlannedTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.ConfirmPlannedTxn}>
            <p className="card-text text-success">
              Added transaction {this.props.lastUserAction.txnGuid}.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.AdjustTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.AdjustTxn}>
            <p className="card-text text-success">
              Adjusted transaction {this.props.lastUserAction.oldGuid},
              adding transaction {this.props.lastUserAction.newGuid}.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.DeleteTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.DeleteTxn}>
            <p className="card-text text-danger">
              Deleted transaction {this.props.lastUserAction.guid}.
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
        <ReactCSSTransitionGroup
          transitionName="card-message"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={10}
        >
          {message}
        </ReactCSSTransitionGroup>
        <table className="table table-hover">
          <thead>
            <tr>
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
