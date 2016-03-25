import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import { showModal, hideModal } from 'budget/client/actions/modal'
import {
  ActionTypes as AT, editTxn, deleteTxn, addPlannedTxn, addTxn,
  fetchPlannedTxns, fetchTxns
} from 'budget/client/actions/account'

import AddPlannedTxnModal from 'budget/client/components/modal/AddPlannedTxn'
import AddTxnModal from 'budget/client/components/modal/AddTxn'
import EditTxnModal from 'budget/client/components/modal/EditTxn'
import ResolvePlannedTxnModal from 'budget/client/components/modal/ResolvePlannedTxn'
import PlannedTxns from 'budget/client/components/card/PlannedTxns'
import Txns from 'budget/client/components/card/Txns'

class Account extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, 1))
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, 1))
  }

  deleteTxn(txn) {
    this.props.dispatch(deleteTxn(txn))
  }

  editTxn(txn, attrs) {
    this.props.dispatch(editTxn(txn, attrs))
  }

  onNewPlannedTxn() {
    this.props.dispatch(showModal('plannedTxnModal'))
  }

  onNewTxn() {
    this.props.dispatch(showModal('addTxnModal'))
  }

  addPlannedTxn(plannedTxn) {
    this.props.dispatch(addPlannedTxn(plannedTxn))
  }

  addTxn(txn) {
    this.props.dispatch(addTxn(txn))
  }

  addTxnToPlannedTxn(plannedTxnGuid, txnGuid) {
    console.log([addTxnToPlannedTxn, plannedTxnGuid, txnGuid])
  }

  onNewPlannedTxnPage(page) {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, page))
  }

  onNewTxnPage(page) {
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, page))
  }

  showEditTxnModal(txn) {
    this.props.dispatch(showModal('editTxnModal', {txn}))
  }

  showResolvePlannedTxnModal(plannedTxn) {
    this.props.dispatch(showModal('resolvePlannedTxnModal', {plannedTxn}))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  render() {
    const account = _find(this.props.app.accounts, (account) => {
      return account.guid === this.props.params.accountGuid
    })

    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'plannedTxnModal') {
        modal = <AddPlannedTxnModal {...this.props.modal}
          app={this.props.app}
          accountGuid={this.props.params.accountGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addPlannedTxn.bind(this)}
        />
      } else if (this.props.modal.name === 'addTxnModal') {
        modal = <AddTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accountGuid={this.props.params.accountGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addTxn.bind(this)}
        />
      } else if (this.props.modal.name === 'editTxnModal') {
        modal = <EditTxnModal {...this.props.modal}
          app={this.props.app}
          onClose={this.hideModal.bind(this)}
          onEdit={this.editTxn.bind(this)}
          onDelete={this.deleteTxn.bind(this)}
        />
      } else if (this.props.modal.name === 'resolvePlannedTxnModal') {
        modal = <ResolvePlannedTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          fixedAccount={account}
          onClose={this.hideModal.bind(this)}
          onAddNew={this.addTxn.bind(this)}
          onAddExisting={this.addTxnToPlannedTxn.bind(this)}
        />
      }
    }

    return (
      <div>
        <div className="container">
          <h1>{account.name}</h1>

          <PlannedTxns
            plannedTxns={this.props.account.plannedTxns.results}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            onNew={this.onNewPlannedTxn.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
            onNewPage={this.onNewPlannedTxnPage.bind(this)}
          />

          <Txns
            txns={this.props.account.txns.results}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            onNew={this.onNewTxn.bind(this)}
            onEdit={this.showEditTxnModal.bind(this)}
            onNewPage={this.onNewTxnPage.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
