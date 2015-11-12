var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

var model = require('client/model')
import { ActionTypes, addPlannedTxn, addTxn, adjustTxn, confirmPlannedTxn, deletePlannedTxn,
  deleteTxn, fetchPlannedTxnsCard, fetchProjectionsCard, fetchTxnsCard } from 'client/actions'

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')
var TxnsCard = require('./Card/TxnsCard')

var AddPlannedTxnModal = require('./Modal/AddPlannedTxnModal')
var ResolvePlannedTxnModal = require('./Modal/ResolvePlannedTxnModal')
var AddTxnModal = require('./Modal/AddTxnModal')
var AdjustTxnModal = require('./Modal/AdjustTxnModal')

class Overview extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.load()
  }

  changeProjectionDate(date) {
    this.loadProjections(date)
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

  load() {
    model.get(
      ['transactionTypes', {from: 0, to: 50}, ['guid', 'name']],
      ['accounts', {from: 0, to: 9}, ['guid', 'name']]
    ).then(
      response => this.setState({
        transactionTypes: response.json.transactionTypes,
        accounts: response.json.accounts
      })
    )

    this.loadProjections()
    this.loadPlannedTxns()
    this.loadTxns()
  }

  loadProjections(date, force = false) {
    this.props.dispatch(fetchProjectionsCard(date, force))
  }

  loadPlannedTxns(force = false) {
    this.props.dispatch(fetchPlannedTxnsCard(force))
  }

  loadTxns(force = false) {
    this.props.dispatch(fetchTxnsCard(force))
  }

  render() {
    let modal

    if (this.props.activeModal === 'addPlannedTxnModal') {
      modal = <AddPlannedTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    } else if (this.props.activeModal === 'resolvePlannedTxnModal') {
      modal = <ResolvePlannedTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        plannedTxn={this.props.resolvePlannedTxnModal.plannedTxn}
        onClose={this.hideModal.bind(this)}
        onConfirm={this.onConfirmPlannedTxn.bind(this)}
        onDelete={this.onDeletePlannedTxn.bind(this)}
      />
    } else if (this.props.activeModal === 'addTxnModal') {
      modal = <AddTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    } else if (this.props.activeModal === 'adjustTxnModal') {
      modal = <AdjustTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
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
          <ProjectionsCard
            data={this.props.projectionsCard}
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
