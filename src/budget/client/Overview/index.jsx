var React = require('react')

var model = require('client/model')

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')
var TxnsCard = require('./Card/TxnsCard')

var AddPlannedTxnModal = require('./Modal/AddPlannedTxnModal')
var ResolvePlannedTxnModal = require('./Modal/ResolvePlannedTxnModal')
var NewTxnModal = require('./Modal/NewTxnModal')
var AdjustTxnModal = require('./Modal/AdjustTxnModal')

class Overview extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.load()
  }

  addPlannedTxn(newPlannedTxn) {
    model.call('plannedTransactions.add', [newPlannedTxn], [['guid']]).then(
      response => {
        this.setState({
          addPlannedTxnModalActive: false,
          newPlannedTxnGuid: response.json.plannedTransactions.latest.guid
        })
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
        this.loadPlannedTxns(true)
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
        this.loadPlannedTxns(true)
      }
    )
  }

  showNewTransactionModal() {
    this.setState({transactionModalActive: true})
  }

  showAdjustTxnModal(txn) {
    this.setState({
      adjustTxnModalActive: true,
      txnToAdjust: txn
    })
  }

  onAdjustTxn(guid) {
    this.setState({
      adjustTxnModalActive: false,
      latestTransactionGuid: guid
    })
  }

  onDeleteTxn(guid) {
    this.setState({
      adjustTxnModalActive: false,
      latestDeletedTxnGuid: guid
    })
  }

  handleNewTransaction(guid) {
    this.setState({
      transactionModalActive: false,
      latestTransactionGuid: guid
    })
  }

  hideModal() {
    this.setState({
      addPlannedTxnModalActive: false,
      resolvePlannedTxnModalActive: false,
      transactionModalActive: false,
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

    this.loadPlannedTxns()
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
    } else if (this.state.transactionModalActive) {
      modal = <NewTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.handleNewTransaction.bind(this)}
      />
    } else if (this.state.adjustTxnModalActive) {
      modal = <AdjustTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        txn={this.state.txnToAdjust}
        onClose={this.hideModal.bind(this)}
        onAdjust={this.onAdjustTxn.bind(this)}
        onDelete={this.onDeleteTxn.bind(this)}
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
            latestPlannedTransactionGuid={this.state.latestPlannedTransactionGuid}
            latestTransactionGuid={this.state.latestTransactionGuid}
            latestDeletedPlannedTxnGuid={this.state.latestDeletedPlannedTxnGuid}
          />
          <PlannedTxnsCard
            plannedTxns={this.state.plannedTxns}
            onNew={this.showAddPlannedTxnModal.bind(this)}
            onResolve={this.showResolvePlannedTxnModal.bind(this)}
          />
          <TxnsCard
            onNew={this.showNewTransactionModal.bind(this)}
            onAdjust={this.showAdjustTxnModal.bind(this)}
            latestTransactionGuid={this.state.latestTransactionGuid}
            latestDeletedTxnGuid={this.state.latestDeletedTxnGuid}
          />
        </div>

        {modal}
      </div>
    )
  }

}

module.exports = Overview
