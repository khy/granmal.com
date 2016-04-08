import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _pick from 'lodash/pick'

import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'
import { showModal, hideModal } from 'budget/client/actions/modal'
import { ButtonGroup, SecondaryButton } from 'client/components/bootstrap/button'
import { Table, Tbody } from 'client/components/bootstrap/table'

import { deleteTxn, editTxn, fetchTxn } from 'budget/client/actions/txns'
import AddTxnModal from 'budget/client/components/modal/AddTxn'

class Show extends React.Component {

  componentDidMount() {
    this.fetchData(this.props.params.guid)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.guid != nextProps.params.guid) {
      this.fetchData(nextProps.params.guid)
    }
  }

  fetchData(txnGuid) {
    this.props.dispatch(fetchTxn(txnGuid))
  }

  get txn() {
    return _get(this.props.txns, 'show.txn')
  }

  get isFetching() {
    return _get(this.props.txns, 'show.isFetching')
  }

  get account() {
    if (this.txn) {
      return _find(this.props.app.accounts, (account) => {
        return account.guid === this.txn.accountGuid
      })
    }
  }

  get txnType() {
    if (this.txn) {
      return _find(this.props.app.txnTypes, (txnType) => {
        return txnType.guid === this.txn.transactionTypeGuid
      })
    }
  }

  showAddTxnModal() {
    this.props.dispatch(showModal('addTxnModal'))
  }

  editTxn(attrs) {
    this.props.dispatch(editTxn(this.txn, attrs))
  }

  deleteTxn(txn) {
    this.props.dispatch(deleteTxn(this.txn))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'addTxnModal') {
        modal = <AddTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accounts={this.props.app.accounts}
          initialAccountGuid={this.txn.accountGuid}
          initialTxnTypeGuid={this.txn.transactionTypeGuid}
          initialAmount={this.txn.amount}
          initialDate={this.txn.date}
          initialName={this.txn.name}
          onClose={this.hideModal.bind(this)}
          onAdd={this.editTxn.bind(this)}
        />
      }
    }

    let mainTableBody

    if (this.txn) {
      let plannedTxnTd

      if (this.txn.plannedTransactionGuid) {
        plannedTxnTd = <td>
          <Link to={`/budget/plannedTransactions/${this.txn.plannedTransactionGuid}`}>
            {shortenGuid(this.txn.plannedTransactionGuid)}
          </Link>
        </td>
      } else {
        plannedTxnTd = <td className="text-danger">Unplanned</td>
      }

      let editedTxnTr

      if (this.txn.editedTxnGuid) {
        editedTxnTr = (
          <tr>
            <th>Edited Transaction</th>
            <td>{this.txn.editedTransactionGuid}</td>
          </tr>
        )
      }

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
            <td>{formatDate(this.txn.date)}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{this.txn.amount}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{this.txn.name}</td>
          </tr>
          <tr>
            <th>Planned Transaction</th>
            {plannedTxnTd}
          </tr>
          {editedTxnTr}
          <tr>
            <th>Created By</th>
            <td>{this.txn.createdBy.name || this.txn.createdBy.handle}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{formatDate(this.txn.createdAt)}</td>
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
          <h1>Transaction {shortenGuid(this.props.params.guid)}</h1>

          <ButtonGroup className="header-btn-group">
            <SecondaryButton onClick={this.showAddTxnModal.bind(this)}>Edit</SecondaryButton>
            <SecondaryButton onClick={this.deleteTxn.bind(this)}>Delete</SecondaryButton>
          </ButtonGroup>

          <Table>
            {mainTableBody}
          </Table>

          {modal}
        </div>
      </div>
    )
  }

}

const select = (state) => _pick(state, 'app', 'modal', 'txns')
export default connect(select)(Show)
