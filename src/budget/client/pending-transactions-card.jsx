var React = require('react')
var ReactDom = require('react-dom')
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
    console.log(this.state.pendingTransactions)
    var rows = Object.keys(this.state.pendingTransactions).map ( index => {
      return (
        <tr key={index}>
          <td>{this.state.pendingTransactions[index].date}</td>
          <td>{this.state.pendingTransactions[index].amount}</td>
          <td>{this.state.pendingTransactions[index].type}</td>
          <td>{this.state.pendingTransactions[index].account}</td>
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
    model.get(['pendingTransactions', {from: 0, to: 5}, ['guid', 'date', 'amount', 'type', 'account']])
      .then(response => this.setState({pendingTransactions: response.json.pendingTransactions}))
  }

}

module.exports = PendingTransactionsCard
