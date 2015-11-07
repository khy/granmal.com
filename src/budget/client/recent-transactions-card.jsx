var React = require('react')
var ReactDom = require('react-dom')

var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

var model = require('./model.js')

require("./app.scss")

class RecentTransactionsCard extends React.Component {

  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  componentWillMount() {
    this.load()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.latestTransactionGuid) {
      this.reload()
    }
  }

  load() {
    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['transactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => this.setState({transactions: response.json.transactions})
    )
  }

  reload() {
    model.invalidate(['transactions'])
    this.load()
  }

  handleNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onAdjust(event) {
    event.preventDefault()
    var txn = _find(this.state.transactions, (txn) => {
      return txn.guid === event.target.dataset.guid
    })
    this.props.onAdjust(txn)
  }

  render() {
    var rows = _map(this.state.transactions, (value, key) => {
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

    if (this.props.latestTransactionGuid) {
      message = (
        <div className="card-block">
          <p className="card-text text-success">
            Successfully added transaction {this.props.latestTransactionGuid}.
          </p>
        </div>
      )
    }

    return (
      <div className="card">
        <div className="card-header">
          Recent Transactions
          <a className="pull-right" href="#" onClick={this.handleNew.bind(this)}>
            New Transaction
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

module.exports = RecentTransactionsCard
