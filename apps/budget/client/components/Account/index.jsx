import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import EditTxnModal from './Modal/EditTxn'
import NavMenuModal from './Modal/NavMenu'
import PlannedTxnModal from './Modal/PlannedTxn'
import ResolvePlannedTxnModal from 'budget/client/components/modal/ResolvePlannedTxn'
import AddTxnModal from './Modal/AddTxn'
import PlannedTxns from './Card/PlannedTxns'
import Txns from './Card/Txns'
import {
  ActionTypes as AT, editTxn, deleteTxn, addPlannedTxn, addTxn,
  fetchPlannedTxns, fetchTxns
} from 'budget/client/actions/account'

class Account extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menuToggled: false,
    }
  }

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
    this.props.dispatch({type: AT.PlannedTxnModalShow})
  }

  onNewTxn() {
    this.props.dispatch({type: AT.TxnModalShow})
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
    this.props.dispatch({type: AT.EditTxnModalShow, txn})
  }

  showResolvePlannedTxnModal(plannedTxn) {
    this.props.dispatch({type: AT.ResolvePlannedTxnModalShow, plannedTxn})
  }

  hideModal() {
    this.props.dispatch({ type: AT.HideModal })
  }

  render() {
    const account = _find(this.props.app.accounts, (account) => {
      return account.guid === this.props.params.accountGuid
    })

    let modal

    if (this.state.menuToggled) {
      modal = <NavMenuModal onClose={this.hideMenu.bind(this)} />
    } else if (this.props.account.activeModal === 'plannedTxnModal') {
      modal = <PlannedTxnModal {...this.props.plannedTxnModal}
        app={this.props.app}
        accountGuid={this.props.params.accountGuid}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    } else if (this.props.account.activeModal === 'addTxnModal') {
      modal = <AddTxnModal {...this.props.addTxnModal}
        app={this.props.app}
        accountGuid={this.props.params.accountGuid}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    } else if (this.props.account.activeModal === 'editTxnModal') {
      modal = <EditTxnModal {...this.props.account.editTxnModal}
        app={this.props.app}
        onClose={this.hideModal.bind(this)}
        onEdit={this.editTxn.bind(this)}
        onDelete={this.deleteTxn.bind(this)}
      />
    } else if (this.props.account.activeModal === 'resolvePlannedTxnModal') {
      modal = <ResolvePlannedTxnModal {...this.props.account.resolvePlannedTxnModal}
        txnTypes={this.props.app.txnTypes}
        fixedAccount={account}
        onClose={this.hideModal.bind(this)}
        onAddNew={this.addTxn.bind(this)}
        onAddExisting={this.addTxnToPlannedTxn.bind(this)}
      />
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

          <Txns {...this.props.account.txns}
            onNew={this.onNewTxn.bind(this)}
            onNewPage={this.onNewTxnPage.bind(this)}
            onEdit={this.showEditTxnModal.bind(this)}
            app={this.props.app}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
