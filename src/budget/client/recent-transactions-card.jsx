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
    this.update()
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

    return (
      <div className="card">
        <div className="card-header">
          Recent Transactions
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

  update() {
    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', 'name'],
      ['transactions', {from: 0, to: 9}, 'account', 'name']
    ).then(
      response => this.setState({transactions: response.json.transactions})
    )
  }

}

module.exports = RecentTransactionsCard
