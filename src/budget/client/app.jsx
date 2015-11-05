var React = require('react')
var ReactDom = require('react-dom')

var model = require('./model.js')

var ProjectionsCard = require('./projections-card.jsx')
var PlannedTransactionsCard = require('./planned-transactions-card.jsx')
var RecentTransactionsCard = require('./recent-transactions-card.jsx')

var NewPlannedTransactionsModal = require('./new-planned-transaction-modal.jsx')

require("./app.scss")

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      plannedTransactionModalActive: false
    }
  }

  componentWillMount() {
    this.update()
  }

  render() {
    let modal

    if (this.state.plannedTransactionModalActive) {
      modal = <NewPlannedTransactionsModal
        transactionTypes={this.state.transactionTypes}
        accounts={this.state.accounts}
        onClose={this.hideModal.bind(this)}
        onAdd={this.handleNewPlannedTransaction.bind(this)}
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
          <ProjectionsCard />
          <PlannedTransactionsCard onNew={this.showNewPlannedTransactionModal.bind(this)} />
          <RecentTransactionsCard />
        </div>

        {modal}
      </div>
    )
  }

  showNewPlannedTransactionModal() {
    this.setState({
      plannedTransactionModalActive: true
    })
  }

  handleNewPlannedTransaction() {
    this.setState({
      plannedTransactionModalActive: false
    })
  }

  hideModal() {
    this.setState({
      plannedTransactionModalActive: false
    })
  }

  update() {
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

}

ReactDom.render(<App/>, document.querySelector('#app'))
