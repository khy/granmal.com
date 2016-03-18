import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import { showModal, hideModal } from 'budget/client/actions/modal'
import {
  ActionTypes as AT, editTxn, deleteTxn, addPlannedTxn, addTxn,
  fetchPlannedTxns, fetchTxns
} from 'budget/client/actions/account'
import ResolvePlannedTxnModal from 'budget/client/components/modal/ResolvePlannedTxn'
import PlannedTxns from 'budget/client/components/card/PlannedTxns'
import Txns from 'budget/client/components/card/Txns'

import EditTxnModal from './Modal/EditTxn'
import PlannedTxnModal from './Modal/PlannedTxn'
import AddTxnModal from './Modal/AddTxn'

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
        modal = <PlannedTxnModal {...this.props.modal}
          app={this.props.app}
          accountGuid={this.props.params.accountGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addPlannedTxn.bind(this)}
        />
      } else if (this.props.modal.name === 'addTxnModal') {
        modal = <AddTxnModal {...this.props.modal}
          app={this.props.app}
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

          <PlannedTxns {...this.props.account.plannedTxns}
            onNew={this.onNewPlannedTxn.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
            onNewPage={this.onNewPlannedTxnPage.bind(this)}
            app={this.props.app}
          />

          <Txns
            txns={this.props.account.txns.results}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            onNew={this.onNewTxn.bind(this)}
            onNewPage={this.onNewTxnPage.bind(this)}
            onEdit={this.showEditTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
