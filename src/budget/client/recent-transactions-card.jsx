var React = require('react')
var ReactDom = require('react-dom')

var moment = require('moment')
var _map = require('lodash/collection/map')

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
      ['transactions', {from: 0, to: 9}, 'transactionType', 'name'],
      ['transactions', {from: 0, to: 9}, 'account', 'name']
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


  render() {
    var rows = _map(this.state.transactions, (value, key) => {
      return (
        <tr key={value.guid}>
          <td>{moment(value.timestamp).format('MM/DD/YY')}</td>
          <td>{value.amount}</td>
          <td>{value.transactionType.name}</td>
          <td>{value.account.name}</td>
          <td><a href="#">Adjust</a></td>
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
