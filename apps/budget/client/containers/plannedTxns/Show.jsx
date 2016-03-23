import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _find from 'lodash/collection/find'
import _get from 'lodash/object/get'
import _pick from 'lodash/object/pick'

import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'
import { Table, Tbody } from 'client/components/bootstrap/table'

import { fetchPlannedTxn } from 'budget/client/actions/plannedTxns'

class Show extends React.Component {

  componentDidMount() {
    this.fetchData(this.props.params.guid)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.guid != nextProps.params.guid) {
      this.fetchData(nextProps.params.guid)
    }
  }

  fetchData(plannedTxnGuid) {
    this.props.dispatch(fetchPlannedTxn(plannedTxnGuid))
  }

  get plannedTxn() {
    return _get(this.props.plannedTxns, 'show.plannedTxn')
  }

  get isFetching() {
    return _get(this.props.plannedTxns, 'show.isFetching')
  }

  get account() {
    if (this.plannedTxn) {
      return _find(this.props.app.accounts, (account) => {
        return account.guid === this.plannedTxn.accountGuid
      })
    }
  }

  get txnType() {
    if (this.plannedTxn) {
      return _find(this.props.app.txnTypes, (txnType) => {
        return txnType.guid === this.plannedTxn.transactionTypeGuid
      })
    }
  }

  render() {
    let mainTableBody

    if (this.plannedTxn) {
      mainTableBody = (
        <Tbody>
          <tr>
            <th>Account</th>
            <td>
              <Link to={`/budget/accounts/${this.account.guid}`}>
                {this.account.name}
              </Link>
            </td>
          </tr>
          <tr>
            <th>Transaction Type</th>
            <td>
              <Link to={`/budget/transactionTypes/${this.txnType.guid}`}>
                {this.txnType.name}
              </Link>
            </td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{`${formatDate(this.plannedTxn.minDate)} - ${formatDate(this.plannedTxn.maxDate)}`}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{`${this.plannedTxn.minAmount} / ${this.plannedTxn.maxAmount}`}</td>
          </tr>
          <tr>
            <th>Created By</th>
            <td>{this.plannedTxn.createdBy.name || this.plannedTxn.createdBy.handle}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{formatDate(this.plannedTxn.createdAt)}</td>
          </tr>
        </Tbody>
      )
    } else {
      mainTableBody = (
        <Tbody>
          <tr>
            <td colSpan="2" className="no-table-content">Loading...</td>
          </tr>
        </Tbody>
      )
    }

    return (
      <div>
        <div className="container">
          <h1>Planned Transaction {shortenGuid(this.props.params.guid)}</h1>
          <Table>
            {mainTableBody}
          </Table>
        </div>
      </div>
    )
  }

}

const select = (state) => _pick(state, 'app', 'plannedTxns')
export default connect(select)(Show)
