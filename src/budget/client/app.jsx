var React = require('react')
var ReactDom = require('react-dom')

var model = require('./model.js')

var ProjectionsCard = require('./projections-card.jsx')
var PlannedTransactionsCard = require('./planned-transactions-card.jsx')
var RecentTransactionsCard = require('./recent-transactions-card.jsx')

var NewPlannedTransactionModal = require('./new-planned-transaction-modal.jsx')
var NewTransactionModal = require('./new-transaction-modal.jsx')

require("./app.scss")

class App extends React.Component {

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
    this.setState({
      plannedTransactionModalActive: true,
      transactionModalActive: false
    })
  }

  handleNewPlannedTransaction(guid) {
    this.setState({
      plannedTransactionModalActive: false,
      latestPlannedTransactionGuid: guid
    })
  }

  showNewTransactionModal() {
    this.setState({
      plannedTransactionModalActive: false,
      transactionModalActive: true
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
      transactionModalActive: false
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
      modal = <NewPlannedTransactionModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.handleNewPlannedTransaction.bind(this)}
      />
    } else if (this.state.transactionModalActive) {
      modal = <NewTransactionModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.handleNewTransaction.bind(this)}
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
          />
          <PlannedTransactionsCard
            onNew={this.showNewPlannedTransactionModal.bind(this)}
            latestPlannedTransactionGuid={this.state.latestPlannedTransactionGuid}
          />
          <RecentTransactionsCard
            onNew={this.showNewTransactionModal.bind(this)}
            latestTransactionGuid={this.state.latestTransactionGuid}
          />
        </div>

        {modal}
      </div>
    )
  }

}

ReactDom.render(<App/>, document.querySelector('#app'))
