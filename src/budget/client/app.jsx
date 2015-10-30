var React = require('react')
var ReactDom = require('react-dom')

var model = require('./model.js')

var ProjectionsCard = require('./projections-card.jsx')
var PlannedTransactionsCard = require('./planned-transactions-card.jsx')
var RecentTransactionsCard = require('./recent-transactions-card.jsx')

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
      modal = (
        <div>
          <div className="modal-backdrop in" onClick={this.hideModal.bind(this)}></div>
          <div className="modal" style={{display: 'block', paddingLeft: '0px'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button className="close" type="button" onClick={this.hideModal.bind(this)}>
                    <span>&times;</span>
                  </button>
                  <h4 className="modal-title">New Planned Transaction</h4>
                </div>
                <div className="modal-body">
                  <p>New Planned Transaction</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.hideModal.bind(this)}>Close</button>
                  <button type="button" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
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

  hideModal() {
    this.setState({
      plannedTransactionModalActive: false
    })
  }

  update() {}

}

ReactDom.render(<App/>, document.querySelector('#app'))
