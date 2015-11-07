var React = require('react')
var ReactDom = require('react-dom')

var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

var model = require('./model.js')

require("./app.scss")

class PlannedTransactionsCard extends React.Component {

  constructor() {
    super()
    this.state = {
      plannedTransactions: []
    }
  }

  componentWillMount() {
    this.load()
  }

  componentWillReceiveProps(newProps) {
    if (
      (newProps.latestPlannedTransactionGuid !== this.props.latestPlannedTransactionGuid) ||
      (newProps.latestTransactionGuid !== this.props.latestTransactionGuid)
    ) {
      this.reload()
    }
  }

  load() {
    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => this.setState({
        plannedTransactions: response.json.plannedTransactions
      })
    )
  }

  reload() {
    model.invalidate(['plannedTransactions'])
    this.load()
  }

  handleNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onResolve(event) {
    event.preventDefault()
    var plannedTxn = _find(this.state.plannedTransactions, (plannedTxn) => {
      return plannedTxn.guid === event.target.dataset.guid
    })
    this.props.onResolve(plannedTxn)
  }

  render() {
    var rows = _map(this.state.plannedTransactions, (value, key) => {
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
          <a className="pull-right" onClick={this.handleNew.bind(this)} href="#">
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

module.exports = PlannedTransactionsCard
