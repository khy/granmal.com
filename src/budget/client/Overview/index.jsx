var React = require('react')
import { connect } from 'react-redux'
var moment = require('moment')

var model = require('client/model')
import { ActionTypes, addPlannedTxn, fetchPlannedTxnsCard, fetchProjectionsCard, fetchTxnsCard } from 'client/actions'

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
    this.setState({
      resolvePlannedTxnModalActive: true,
      plannedTxnToResolve: plannedTxn
    })
  }

  onConfirmPlannedTxn(newTransaction) {
    model.call('transactions.add', [newTransaction], [['guid']]).then(
      response => {
        this.setState({
          resolvePlannedTxnModalActive: false,
          newTxnGuid: response.json.transactions.latest.guid
        })
        this.loadProjections(null, true)
        this.loadPlannedTxns(true)
        this.loadTxns(true)
      }
    )
  }

  onDeletePlannedTxn(guid) {
    model.call('plannedTransactions.delete', [guid]).then(
      response => {
        this.setState({
          resolvePlannedTransactionModalActive: false,
          latestDeletedPlannedTxnGuid: guid
        })
        this.loadProjections(null, true)
        this.loadPlannedTxns(true)
      }
    )
  }

  showAddTxnModal() {
    this.setState({addTxnModalActive: true})
  }

  addTxn(txn) {
    model.call('transactions.add', [txn], [['guid']]).then(
      response => {
        this.setState({
          addTxnModalActive: false,
          latestTransactionGuid: response.json.transactions.latest.guid
        })
        this.loadProjections(null, true)
        this.loadTxns(true)
      }
    )
  }

  showAdjustTxnModal(txn) {
    this.setState({
      adjustTxnModalActive: true,
      txnToAdjust: txn
    })
  }

  adjustTxn(guid, newTransaction) {
    model.call('transactions.adjust', [guid, newTransaction], [['guid']]).then(
      response => {
        this.setState({
          adjustTxnModalActive: false,
          latestTransactionGuid: response.json.transactions.latest.guid
        })
        this.loadProjections(null, true)
        this.loadTxns(true)
      }
    )
  }

  deleteTxn(guid) {
    model.call('transactions.delete', [guid]).then(
      response => {
        this.setState({
          adjustTxnModalActive: false,
          latestDeletedTxnGuid: guid
        })
        this.loadProjections(null, true)
        this.loadTxns(true)
      }
    )
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
        plannedTxn={this.state.plannedTxnToResolve}
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
        txn={this.state.txnToAdjust}
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
            data={this.props.plannedTxnsCard}
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
