var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

import {
  ActionTypes, addPlannedTxn, addTxn, adjustTxn, confirmPlannedTxn,
  deletePlannedTxn, deleteTxn, fetchAccounts, fetchPlannedTxnsCard,
  fetchProjectionsCard, fetchTxnsCard, fetchTxnTypes
} from 'budget/client/actions'

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

    if (this.props.overview.activeModal === 'addPlannedTxnModal') {
      modal = <AddPlannedTxnModal {...this.props.overview.addPlannedTxnModal}
        transactionTypes={this.props.model.transactionTypes}
        accounts={this.props.model.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'resolvePlannedTxnModal') {
      modal = <ResolvePlannedTxnModal {...this.props.overview.resolvePlannedTxnModal}
        transactionTypes={this.props.model.transactionTypes}
        accounts={this.props.model.accounts}
        onClose={this.hideModal.bind(this)}
        onConfirm={this.onConfirmPlannedTxn.bind(this)}
        onDelete={this.onDeletePlannedTxn.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'addTxnModal') {
      modal = <AddTxnModal {...this.props.overview.addTxnModal}
        transactionTypes={this.props.model.transactionTypes}
        accounts={this.props.model.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    } else if (this.props.overview.activeModal === 'adjustTxnModal') {
      modal = <AdjustTxnModal {...this.props.overview.adjustTxnModal}
        transactionTypes={this.props.model.transactionTypes}
        accounts={this.props.model.accounts}
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
          <ProjectionsCard {...this.props.overview.projectionsCard}
            projectionsByDate={this.props.model.projectionsByDate}
            onDateChange={this.changeProjectionDate.bind(this)}
          />
          <PlannedTxnsCard {...this.props.overview.plannedTxnsCard}
            plannedTxns={this.props.model.plannedTransactions}
            lastUserAction={this.props.overview.lastUserAction}
            onNew={this.showAddPlannedTxnModal.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
          <TxnsCard {...this.props.overview.txnsCard}
            txns={this.props.model.transactions}
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
