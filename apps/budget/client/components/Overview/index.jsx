var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

import { showModal, hideModal } from 'budget/client/actions/modal'

import {
  ActionTypes, UserActionTypes, addAccount, addTransfer, confirmPlannedTxn,
  deletePlannedTxn, fetchAccounts, fetchAccountTypes, fetchPlannedTxnsCard,
  fetchProjectionsCard, fetchTxnTypes
} from 'budget/client/actions/overview'

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')

var AddAccountModal = require('./Modal/AddAccountModal')
import ResolvePlannedTxnModal from 'budget/client/components/modal/ResolvePlannedTxn'
var AddTransferModal = require('./Modal/AddTransferModal')

import { shortenGuid } from 'budget/client/lib/guid'

class Overview extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menuToggled: false,
    }
  }

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

  showResolvePlannedTxnModal(plannedTxn) {
    this.props.dispatch(showModal('resolvePlannedTxnModal', {plannedTxn}))
  }

  onConfirmPlannedTxn(newTxn) {
    this.props.dispatch(confirmPlannedTxn(newTxn))
  }

  onDeletePlannedTxn(guid) {
    this.props.dispatch(deletePlannedTxn(guid))
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
      if (this.props.overview.lastUserAction.type === UserActionTypes.AddTxnType) {
        alert = (
          <div className="alert alert-success" role="alert">
            Added transaction type <strong>{this.props.overview.lastUserAction.name}</strong>
          </div>
        )
      } else if (this.props.overview.lastUserAction.type === UserActionTypes.AddTransfer) {
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
      } else if (this.props.modal.name === 'resolvePlannedTxnModal') {
        modal = <ResolvePlannedTxnModal {...this.props.modal}
          txnTypes={this.props.app.txnTypes}
          accounts={this.props.app.accounts}
          onClose={this.hideModal.bind(this)}
          onAddNew={this.onConfirmPlannedTxn.bind(this)}
          onDelete={this.onDeletePlannedTxn.bind(this)}
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
            app={this.props.app}
            lastUserAction={this.props.overview.lastUserAction}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Overview)
