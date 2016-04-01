import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/map'
import _find from 'lodash/find'

import { fetchPlannedTxns } from 'budget/client/actions/plannedTxns'
import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'

class PlannedTxns extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPlannedTxns())
  }

  render() {
    const txnTypeOptions = (
      _map(this.props.app.txnTypes, (txnType) => {
        return <option value={txnType.guid} key={txnType.guid}>{txnType.name}</option>
      })
    )

    const accountOptions = (
      _map(this.props.app.accounts, (account) => {
        return <option value={account.guid} key={account.guid}>{account.name}</option>
      })
    )

    let rows

    if (this.props.plannedTxns.isFetching) {
      rows = (
        <tr>
          <td colSpan="5" className="text-center text-muted">Loading...</td>
        </tr>
      )
    } else if (this.props.plannedTxns.results.length > 0) {
      rows = _map(this.props.plannedTxns.results, (plannedTxn) => {
        const date = (plannedTxn.minDate === plannedTxn.maxDate) ?
          plannedTxn.minDate : plannedTxn.minDate + " / " + plannedTxn.maxDate

        const amount = (plannedTxn.minAmount === plannedTxn.maxAmount) ?
          plannedTxn.minAmount : plannedTxn.minAmount +  " / " + plannedTxn.maxAmount

        const transactionType = _find(this.props.app.txnTypes, (txnType) => {
          return txnType.guid === plannedTxn.transactionTypeGuid
        })

        const account = _find(this.props.app.accounts, (account) => {
          return account.guid === plannedTxn.accountGuid
        })

        return (
          <tr key={plannedTxn.guid}>
            <td>{shortenGuid(plannedTxn.guid)}</td>
            <td>{date}</td>
            <td>{amount}</td>
            <td>{transactionType.name}</td>
            <td>{account.name}</td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="5" className="text-center text-muted">No Planned Transactions</td>
        </tr>
      )
    }

    return (
      <div>
        <div className="container">
          <h1>Planned Transactions</h1>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(PlannedTxns)
