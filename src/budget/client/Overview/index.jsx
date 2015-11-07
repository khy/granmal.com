var React = require('react')

var model = require('client/model')

var ProjectionsCard = require('./Card/ProjectionsCard')
var PlannedTxnsCard = require('./Card/PlannedTxnsCard')
var TxnsCard = require('./Card/TxnsCard')

var NewPlannedTxnModal = require('./Modal/NewPlannedTxnModal')
var ResolvePlannedTxnModal = require('./Modal/ResolvePlannedTxnModal')
var NewTxnModal = require('./Modal/NewTxnModal')
var AdjustTxnModal = require('./Modal/AdjustTxnModal')

class Overview extends React.Component {

  constructor() {
    super()
    this.state = {
      plannedTransactionModalActive: false
    }
  }

  componentWillMount() {
    this.load()
  }

  showNewPlannedTransactionModal() {
    this.setState({plannedTransactionModalActive: true})
  }

  handleNewPlannedTransaction(guid) {
    this.setState({
      plannedTransactionModalActive: false,
      latestPlannedTransactionGuid: guid
    })
  }

  showResolvePlannedTransactionModal(plannedTxn) {
    this.setState({
      resolvePlannedTransactionModalActive: true,
      plannedTxnToResolve: plannedTxn
    })
  }

  onConfirmPlannedTxn(guid) {
    this.setState({
      resolvePlannedTransactionModalActive: false,
      latestTransactionGuid: guid
    })
  }

  onDeletePlannedTxn(guid) {
    this.setState({
      resolvePlannedTransactionModalActive: false,
      latestDeletedPlannedTxnGuid: guid
    })
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
      plannedTransactionModalActive: false,
      resolvePlannedTransactionModalActive: false,
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
  }

  render() {
    let modal

    if (this.state.plannedTransactionModalActive) {
      modal = <NewPlannedTxnModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.handleNewPlannedTransaction.bind(this)}
      />
    } else if (this.state.resolvePlannedTransactionModalActive) {
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
            onNew={this.showNewPlannedTransactionModal.bind(this)}
            onResolve={this.showResolvePlannedTransactionModal.bind(this)}
            latestPlannedTransactionGuid={this.state.latestPlannedTransactionGuid}
            latestTransactionGuid={this.state.latestTransactionGuid}
            latestDeletedPlannedTxnGuid={this.state.latestDeletedPlannedTxnGuid}
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
