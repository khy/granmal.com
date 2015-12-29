import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'

import Navbar from '../Navbar'
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

    if (this.props.isFetching) {
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

        return (
          <tr key={plannedTxn.guid}>
            <td>{shortenGuid(plannedTxn.guid)}</td>
            <td>{date}</td>
            <td>{amount}</td>
            <td>{plannedTxn.transactionType.name}</td>
            <td>{plannedTxn.account.name}</td>
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
        <Navbar />

        <div className="container">
          <h1>Planned Transactions</h1>

          <div className="card card-block">
            <form>
              <fieldset className="form-group">
                <label>Transaction Type</label>
                <select ref="txnTypeGuidSelect" className="form-control c-select">
                  {txnTypeOptions}
                </select>
              </fieldset>

              <fieldset className="form-group">
                <label>Account</label>
                <select ref="accountGuidSelect" className="form-control c-select">
                  {accountOptions}
                </select>
              </fieldset>

              <button type="submit" className="btn btn-primary">Filter</button>
            </form>
          </div>

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
