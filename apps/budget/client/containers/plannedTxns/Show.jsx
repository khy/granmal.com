import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _pick from 'lodash/pick'

import { formatDate } from 'budget/client/lib/date'
import { formatCurrency } from 'budget/client/lib/currency'
import { shortenGuid } from 'budget/client/lib/guid'
import { showModal, hideModal } from 'client/actions/modal'
import { Table, Tbody } from 'client/components/bootstrap/table'

import Txns from 'budget/client/components/card/Txns'
import AddTxnModal from 'budget/client/components/modal/AddTxn'
import {
  addPlannedTxnTxn, fetchPlannedTxn, fetchPlannedTxnTxns
} from 'budget/client/actions/plannedTxns'

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
    this.props.dispatch(fetchPlannedTxnTxns(plannedTxnGuid))
  }

  showAddTxnModal() {
    this.props.dispatch(showModal('addTxnModal'))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  addTxn(newTxn) {
    this.props.dispatch(addPlannedTxnTxn(this.plannedTxn.guid, newTxn))
  }

  get plannedTxn() {
    return _get(this.props.plannedTxns, 'show.plannedTxn')
  }

  get txns() {
    return _get(this.props.plannedTxns, 'show.txns.txns', [])
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
    let modal

    if (this.props.modal.isVisible && this.plannedTxn) {
      if (this.props.modal.name === 'addTxnModal') {
        modal = <AddTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accounts={this.props.app.accounts}
          accountGuid={this.plannedTxn.accountGuid}
          plannedTxnGuid={this.plannedTxn.guid}
          txnTypeGuid={this.plannedTxn.transactionTypeGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addTxn.bind(this)}
        />
      }
    }

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
            <td>{`${formatCurrency(this.plannedTxn.minAmount)} / ${formatCurrency(this.plannedTxn.maxAmount)}`}</td>
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

          <Txns
            txns={this.txns}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            onNew={this.showAddTxnModal.bind(this)}
          />

          {modal}
        </div>
      </div>
    )
  }

}

const select = (state) => _pick(state, 'app', 'modal', 'plannedTxns')
export default connect(select)(Show)
