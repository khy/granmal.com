var React = require('react')
var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

class PlannedTxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onResolve(event) {
    event.preventDefault()

    var plannedTxn = _find(this.props.data.plannedTxns, (plannedTxn) => {
      return plannedTxn.guid === event.target.dataset.guid
    })

    this.props.onResolve(plannedTxn)
  }

  render() {
    var rows = _map(this.props.data.plannedTxns, (value, key) => {
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

    if (this.props.latestPlannedTransactionGuid) {
      message = (
        <div className="card-block">
          <p className="card-text text-success">
            Successfully added planned transaction {this.props.latestPlannedTransactionGuid}.
          </p>
        </div>
      )
    }

    return (
      <div className="card">
        <div className="card-header">
          Planned Transactions
          <a className="pull-right" onClick={this.onNew.bind(this)} href="#">
            New Planned Transaction
          </a>
        </div>
        {message}
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
