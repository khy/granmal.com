var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

import { ActionTypes, addPlannedTxn, addTxn, adjustTxn, confirmPlannedTxn, deletePlannedTxn,
  deleteTxn, fetchAccounts, fetchPlannedTxnsCard, fetchProjectionsCard, fetchTxnsCard, fetchTxnTypes } from 'client/actions'

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')
var TxnsCard = require('./Card/TxnsCard')

var AddPlannedTxnModal = require('./Modal/AddPlannedTxnModal')
var ResolvePlannedTxnModal = require('./Modal/ResolvePlannedTxnModal')
var AddTxnModal = require('./Modal/AddTxnModal')
var AdjustTxnModal = require('./Modal/AdjustTxnModal')

class Overview extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchAccounts())
    this.props.dispatch(fetchTxnTypes())
    this.props.dispatch(fetchProjectionsCard())
    this.props.dispatch(fetchPlannedTxnsCard())
    this.props.dispatch(fetchTxnsCard())
  }

  changeProjectionDate(date) {
    this.props.dispatch(fetchProjectionsCard(date))
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

  hideModal() {
    this.props.dispatch({ type: ActionTypes.HideModal })
  }

  render() {
    let modal

    if (this.props.activeModal === 'addPlannedTxnModal') {
      modal = <AddPlannedTxnModal
        transactionTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    } else if (this.props.activeModal === 'resolvePlannedTxnModal') {
      modal = <ResolvePlannedTxnModal
        transactionTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        plannedTxn={this.props.resolvePlannedTxnModal.plannedTxn}
        onClose={this.hideModal.bind(this)}
        onConfirm={this.onConfirmPlannedTxn.bind(this)}
        onDelete={this.onDeletePlannedTxn.bind(this)}
      />
    } else if (this.props.activeModal === 'addTxnModal') {
      modal = <AddTxnModal
        transactionTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    } else if (this.props.activeModal === 'adjustTxnModal') {
      modal = <AdjustTxnModal
        transactionTypes={this.props.txnTypes}
        accounts={this.props.accounts}
        txn={this.props.adjustTxnModal.txn}
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
          <ProjectionsCard {...this.props.projectionsCard}
            onDateChange={this.changeProjectionDate.bind(this)}
          />
          <PlannedTxnsCard
            plannedTxns={this.props.plannedTxnsCard.plannedTxns}
            lastAddedPlannedTxnGuid={this.props.lastAddedPlannedTxnGuid}
            lastDeletedPlannedTxnGuid={this.props.lastDeletedPlannedTxnGuid}
            onNew={this.showAddPlannedTxnModal.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
          <TxnsCard
            data={this.props.txnsCard}
            onNew={this.showAddTxnModal.bind(this)}
            onAdjust={this.showAdjustTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state.overview }

export default connect(select)(Overview)
