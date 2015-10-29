var React = require('react')
var ReactDom = require('react-dom')

var model = require('./model.js')

var PlannedTransactionsCard = require('./planned-transactions-card.jsx')
var RecentTransactionsCard = require('./recent-transactions-card.jsx')

require("./app.scss")

class App extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.update()
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <div className="container">
            <h1 className="navbar-brand" href="#">Budget</h1>
          </div>
        </nav>

        <div className="container">
          <PlannedTransactionsCard/>
          <RecentTransactionsCard/>
        </div>
      </div>
    )
  }

  update() {}

}

ReactDom.render(<App/>, document.querySelector('#app'))
