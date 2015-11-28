var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

import {
  ActionTypes, UserActionTypes, addAccount, addPlannedTxn, addTxn, addTxnType, adjustTxn,
  confirmPlannedTxn, deletePlannedTxn, deleteTxn, fetchAccounts, fetchAccountTypes,
  fetchPlannedTxnsCard, fetchProjectionsCard, fetchTxnsCard, fetchTxnTypes
} from 'budget/client/actions'

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')
var TxnsCard = require('./Card/TxnsCard')

var AddAccountModal = require('./Modal/AddAccountModal')
var AddPlannedTxnModal = require('./Modal/AddPlannedTxnModal')
var ResolvePlannedTxnModal = require('./Modal/ResolvePlannedTxnModal')
var AddTxnModal = require('./Modal/AddTxnModal')
import AddTxnTypeModal from './Modal/AddTxnTypeModal'
var AdjustTxnModal = require('./Modal/AdjustTxnModal')

class Overview extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchProjectionsCard())
    this.props.dispatch(fetchPlannedTxnsCard())
    this.props.dispatch(fetchTxnsCard())
  }

  changeProjectionDate(date) {
    this.props.dispatch(fetchProjectionsCard(date))
  }

  showAddAccountModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddAccountModal })
  }

  addAccount(newAccount) {
    this.props.dispatch(addAccount(newAccount))
  }

  addPlannedTxn(newPlannedTxn) {
    this.props.dispatch(addPlannedTxn(newPlannedTxn))
  }

  showAddPlannedTxnModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddPlannedTxnModal })
  }

  showResolvePlannedTxnModal(plannedTxn) {
    this.props.dispatch({
      type: ActionTypes.ShowResolvePlannedTxnModal,
      plannedTxn
    })
  }

  onConfirmPlannedTxn(newTxn) {
    this.props.dispatch(confirmPlannedTxn(newTxn))
  }

  onDeletePlannedTxn(guid) {
    this.props.dispatch(deletePlannedTxn(guid))
  }

  showAddTxnModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddTxnModal })
  }

  addTxn(txn) {
    this.props.dispatch(addTxn(txn))
  }

  showAdjustTxnModal(txn) {
    this.props.dispatch({
      type: ActionTypes.ShowAdjustTxnModal,
      txn
    })
  }

  adjustTxn(guid, newTxn) {
    this.props.dispatch(adjustTxn(guid, newTxn))
  }

  deleteTxn(guid) {
    this.props.dispatch(deleteTxn(guid))
  }

  showNewTxnTypeModal() {
    this.props.dispatch({ type: ActionTypes.ShowAddTxnTypeModal })
  }

  addTxnType(newTxnType) {
    this.props.dispatch(addTxnType(newTxnType))
  }

  hideModal() {
    this.props.dispatch({ type: ActionTypes.HideModal })
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
      }
    }

    let modal

    if (this.props.overview.activeModal === 'addAccountModal') {
      modal = <AddAccountModal {...this.props.overview.addAccountModal}
        accountTypes={this.props.accountTypes}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addAccount.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'addPlannedTxnModal') {
      modal = <AddPlannedTxnModal {...this.props.overview.addPlannedTxnModal}
        txnTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
        onNewTxnType={this.showNewTxnTypeModal.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'resolvePlannedTxnModal') {
      modal = <ResolvePlannedTxnModal {...this.props.overview.resolvePlannedTxnModal}
        txnTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        onClose={this.hideModal.bind(this)}
        onConfirm={this.onConfirmPlannedTxn.bind(this)}
        onDelete={this.onDeletePlannedTxn.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'addTxnModal') {
      modal = <AddTxnModal {...this.props.overview.addTxnModal}
        txnTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'addTxnTypeModal') {
      modal = <AddTxnTypeModal {...this.props.overview.addTxnTypeModal}
        txnTypes={this.props.txnTypes}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxnType.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'adjustTxnModal') {
      modal = <AdjustTxnModal {...this.props.overview.adjustTxnModal}
        txnTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        onClose={this.hideModal.bind(this)}
        onAdjust={this.adjustTxn.bind(this)}
        onDelete={this.deleteTxn.bind(this)}
      />
    }

    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <div className="container">
            <h1 className="navbar-brand" href="#">Budget</h1>
          </div>
        </nav>

        <div className="container">
          {alert}

          <ProjectionsCard {...this.props.overview.projectionsCard}
            lastUserAction={this.props.overview.lastUserAction}
            onDateChange={this.changeProjectionDate.bind(this)}
            onNewAccount={this.showAddAccountModal.bind(this)}
          />
          <PlannedTxnsCard {...this.props.overview.plannedTxnsCard}
            lastUserAction={this.props.overview.lastUserAction}
            onNew={this.showAddPlannedTxnModal.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
          <TxnsCard {...this.props.overview.txnsCard}
            lastUserAction={this.props.overview.lastUserAction}
            onNew={this.showAddTxnModal.bind(this)}
            onAdjust={this.showAdjustTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Overview)
