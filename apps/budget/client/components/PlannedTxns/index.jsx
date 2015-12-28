import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'

import Navbar from '../Navbar'

class PlannedTxns extends React.Component {

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
                <th></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(PlannedTxns)
