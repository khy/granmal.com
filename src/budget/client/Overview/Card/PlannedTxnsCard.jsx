var React = require('react')
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { UserActionTypes } from 'client/actions'

class PlannedTxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onResolve(event) {
    event.preventDefault()

    var plannedTxn = _find(this.props.plannedTxns, (plannedTxn) => {
      return plannedTxn.guid === event.target.dataset.guid
    })

    this.props.onResolve(plannedTxn)
  }

  render() {
    var rows = _map(this.props.plannedTxns, (value, key) => {
      const minDate = moment(value.minTimestamp).format('MM/DD/YY')
      const maxDate = moment(value.maxTimestamp).format('MM/DD/YY')
      const date = (minDate === maxDate) ?
        minDate : minDate + " / " + maxDate

      const amount = (value.minAmount === value.maxAmount) ?
        value.minAmount : value.minAmount +  " / " + value.maxAmount

      const rowClass = (moment(value.minTimestamp) < moment()) ?
        'table-warning' : ''

      return (
        <tr key={value.guid} className={rowClass}>
          <td>{date}</td>
          <td>{amount}</td>
          <td>{value.transactionType.name}</td>
          <td>{value.account.name}</td>
          <td><a onClick={this.onResolve.bind(this)} data-guid={value.guid} href="#">Resolve</a></td>
        </tr>
      )
    })

    let message

    if (this.props.lastUserAction) {
      if (this.props.lastUserAction.type === UserActionTypes.AddPlannedTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.AddPlannedTxn}>
            <p className="card-text text-success">
              Added planned transaction {this.props.lastUserAction.guid}.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.ConfirmPlannedTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.ConfirmPlannedTxn}>
            <p className="card-text text-success">
              Confirm planned transaction {this.props.lastUserAction.plannedTxnGuid}.
            </p>
          </div>
        )
      } else if (this.props.lastUserAction.type === UserActionTypes.DeletePlannedTxn) {
        message = (
          <div className="card-block" key={UserActionTypes.DeletePlannedTxn}>
            <p className="card-text text-danger">
              Deleted planned transaction {this.props.lastUserAction.guid}.
            </p>
          </div>
        )
      }
    }

    return (
      <div className="card">
        <div className="card-header">
          Planned Transactions
          <a className="pull-right" onClick={this.onNew.bind(this)} href="#">
            New Planned Transaction
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

module.exports = PlannedTxnsCard
