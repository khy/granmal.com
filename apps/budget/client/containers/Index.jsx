import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { shortenGuid } from 'budget/client/lib/guid'
import { showModal, hideModal } from 'client/actions/modal'
import {
  ActionTypes, UserActionTypes,
  addAccount, addTransfer, addPlannedTxnTxn,
  fetchAccounts, fetchPlannedTxnsCard,fetchProjectionsCard
} from 'budget/client/actions/overview'

import ProjectionsCard from 'budget/client/components/card/Projections'
import PlannedTxnsCard from 'budget/client/components/card/PlannedTxns'
import AddAccountModal from 'budget/client/components/modal/AddAccount'
import AddTransferModal from 'budget/client/components/modal/AddTransfer'
import AddTxnModal from 'budget/client/components/modal/AddTxn'

class Overview extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchProjectionsCard())
    this.props.dispatch(fetchPlannedTxnsCard())
  }

  changeProjectionDate(date) {
    this.props.dispatch(fetchProjectionsCard(date))
  }

  showAddAccountModal() {
    this.props.dispatch(showModal('addAccountModal'))
  }

  addAccount(newAccount) {
    this.props.dispatch(addAccount(newAccount))
  }

  showAddPlannedTxnTxnModal(plannedTxn) {
    this.props.dispatch(showModal('addTxn', {plannedTxn}))
  }

  addPlannedTxnTxn(newTxn) {
    this.props.dispatch(addPlannedTxnTxn(newTxn))
  }

  showAddTransferModal() {
    this.props.dispatch(showModal('addTransferModal'))
  }

  addTransfer(newTransfer) {
    this.props.dispatch(addTransfer(newTransfer))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  render() {
    let alert

    if (this.props.overview.lastUserAction) {
      if (this.props.overview.lastUserAction.type === UserActionTypes.AddTransfer) {
        alert = (
          <div className="alert alert-success" role="alert">
            Added transfer <strong>{shortenGuid(this.props.overview.lastUserAction.guid)}</strong>
          </div>
        )
      }
    }

    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'addAccountModal') {
        modal = <AddAccountModal {...this.props.modal}
          contextGuid={this.props.app.selectedContextGuid}
          accountTypes={this.props.app.accountTypes}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addAccount.bind(this)}
        />
      } else if (this.props.modal.name === 'addTxn') {
        const plannedTxn = this.props.modal.data.plannedTxn

        modal = <AddTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accounts={this.props.app.accounts}
          accountGuid={plannedTxn.accountGuid}
          plannedTxnGuid={plannedTxn.guid}
          txnTypeGuid={plannedTxn.transactionTypeGuid}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addPlannedTxnTxn.bind(this)}
        />
      } else if (this.props.modal.name === 'addTransferModal') {
        modal = <AddTransferModal {...this.props.modal}
          accounts={this.props.app.accounts}
          onClose={this.hideModal.bind(this)}
          onAdd={this.addTransfer.bind(this)}
        />
      }
    }

    return (
      <div>
        <div className="container">
          {alert}

          <ProjectionsCard {...this.props.overview.projectionsCard}
            lastUserAction={this.props.overview.lastUserAction}
            onDateChange={this.changeProjectionDate.bind(this)}
            onNewAccount={this.showAddAccountModal.bind(this)}
            onNewTransfer={this.showAddTransferModal.bind(this)}
          />

          <PlannedTxnsCard {...this.props.overview.plannedTxnsCard}
            title="Pending Planned Transactions"
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
            lastUserAction={this.props.overview.lastUserAction}
            onAddTxn={this.showAddPlannedTxnTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Overview)
