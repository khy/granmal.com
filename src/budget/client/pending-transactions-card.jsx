var React = require('react')
var ReactDom = require('react-dom')

var _map = require('lodash/collection/map')

var model = require('./model.js')

require("./app.scss")

class PendingTransactionsCard extends React.Component {

  constructor() {
    super()
    this.state = {
      pendingTransactions: []
    }
  }

  componentWillMount() {
    this.update()
  }

  render() {
    var rows = _map(this.state.pendingTransactions, (value, key) => {
      return (
        <tr key={value.guid}>
          <td>{value.date}</td>
          <td>{value.minAmount}</td>
          <td>{value.transactionType.name}</td>
          <td>{value.account.name}</td>
          <td><a href="#">Confirm</a></td>
        </tr>
      )
    })

    return (
      <div className="card">
        <div className="card-header">
          Pending Transactions
        </div>
        <table className="table">
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
      ['pendingTransactions', {from: 0, to: 5}, ['guid', 'date', 'minAmount']],
      ['pendingTransactions', {from: 0, to: 5}, 'transactionType', 'name'],
      ['pendingTransactions', {from: 0, to: 5}, 'account', 'name']
    ).then(
      response => this.setState({pendingTransactions: response.json.pendingTransactions})
    )
  }

}

module.exports = PendingTransactionsCard
