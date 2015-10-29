var React = require('react')
var ReactDom = require('react-dom')

var _map = require('lodash/collection/map')

var model = require('./model.js')

require("./app.scss")

class ProjectionsCard extends React.Component {

  constructor() {
    super()
    this.state = { projections: [] }
  }

  componentWillMount() {
    this.update()
  }

  render() {
    var rows = _map(this.state.projections, (value, key) => {
      return (
        <tr key={value.account.name}>
          <td>{value.account.name}</td>
          <td>{value.account.balance}</td>
          <td>{value.minBalance}</td>
          <td>{value.maxBalance}</td>
        </tr>
      )
    })

    return (
      <div className="card">
        <div className="card-header">
          Projections
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Account</th>
              <th>Current Balance</th>
              <th>Min Balance</th>
              <th>Max Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

  update() {
    model.get(
      ['projectionsByDate', '2015-11-01', {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', '2015-11-01', {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => this.setState({projections: response.json.projectionsByDate['2015-11-01']})
    )
  }

}

module.exports = ProjectionsCard
