var React = require('react')
var ReactDom = require('react-dom')

var moment = require('moment')
var _map = require('lodash/collection/map')

var model = require('./model.js')

require("./app.scss")

class PlannedTransactionsCard extends React.Component {

  render() {
    var rows = _map(this.props.plannedTransactions, (value, key) => {
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
          <td><a href="#">Resolve</a></td>
        </tr>
      )
    })

    return (
      <div className="card">
        <div className="card-header">
          Planned Transactions
          <a className="pull-right" href="#" onClick={this.handleNew.bind(this)}>
            New Planned Transaction
          </a>
        </div>
        <div className="card-block">
          <p className="card-text text-success">
            <strong>Well done!</strong> You successfully read this important alert message.
          </p>
        </div>
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

  handleNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

}

module.exports = PlannedTransactionsCard
