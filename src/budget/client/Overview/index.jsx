var React = require('react')
var moment = require('moment')
import { connect } from 'react-redux'

var model = require('client/model')
import { fetchProjections } from 'client/actions'

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
    this.props.dispatch(fetchProjections(date))
  }

  addPlannedTxn(newPlannedTxn) {
    model.call('plannedTransactions.add', [newPlannedTxn], [['guid']]).then(
      response => {
        this.setState({
          addPlannedTxnModalActive: false,
          newPlannedTxnGuid: response.json.plannedTransactions.latest.guid
        })
        this.loadProjections(true)
        this.loadPlannedTxns(true)
      }
    )
  }

  showAddPlannedTxnModal() {
    this.setState({
      addPlannedTxnModalActive: true
    })
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
        this.loadProjections(true)
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
        this.loadProjections(true)
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
        this.loadProjections(true)
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
        this.loadProjections(true)
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
        this.loadProjections(true)
        this.loadTxns(true)
      }
    )
  }

  hideModal() {
    this.setState({
      addPlannedTxnModalActive: false,
      resolvePlannedTxnModalActive: false,
      addTxnModalActive: false,
      adjustTxnModalActive: false
    })
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

    this.props.dispatch(fetchProjections(moment().add(1, 'month').startOf('month')))
    this.loadPlannedTxns()
    this.loadTxns()
  }

  loadPlannedTxns(force = false) {
    if (force) { model.invalidate(['plannedTransactions']) }

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        this.setState({
          plannedTxns: response ? response.json.plannedTransactions : []
        })
      }
    )
  }

  loadTxns(force = false) {
    if (force) { model.invalidate(['transactions']) }

    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['transactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        this.setState({
          txns: response ? response.json.transactions : []
        })
      }
    )
  }

  render() {
    let modal

    if (this.state.addPlannedTxnModalActive) {
      modal = <AddPlannedTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    } else if (this.state.resolvePlannedTxnModalActive) {
      modal = <ResolvePlannedTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        plannedTxn={this.state.plannedTxnToResolve}
        onClose={this.hideModal.bind(this)}
        onConfirm={this.onConfirmPlannedTxn.bind(this)}
        onDelete={this.onDeletePlannedTxn.bind(this)}
      />
    } else if (this.state.addTxnModalActive) {
      modal = <AddTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    } else if (this.state.adjustTxnModalActive) {
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
            plannedTxns={this.state.plannedTxns}
            onNew={this.showAddPlannedTxnModal.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
          <TxnsCard
            txns={this.state.txns}
            onNew={this.showAddTxnModal.bind(this)}
            onAdjust={this.showAdjustTxnModal.bind(this)}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { console.log(state); return state }

export default connect(select)(Overview)
