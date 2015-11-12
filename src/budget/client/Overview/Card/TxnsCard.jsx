var React = require('react')
var moment = require('moment')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

class TxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onAdjust(event) {
    event.preventDefault()
    var txn = _find(this.props.data.txns, (txn) => {
      return txn.guid === event.target.dataset.guid
    })
    this.props.onAdjust(txn)
  }

  render() {
    var rows = _map(this.props.data.txns, (value, key) => {
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
          Transactions
          <a className="pull-right" href="#" onClick={this.onNew.bind(this)}>
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

module.exports = TxnsCard
