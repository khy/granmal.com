var React = require('react')
var ReactDom = require('react-dom')

var moment = require('moment')
var _map = require('lodash/collection/map')

var model = require('./model.js')

require("./app.scss")

class ProjectionsCard extends React.Component {

  constructor() {
    super()
    this.state = {
      date: moment().add(1, 'month').startOf('month'),
      projections: []
    }
  }

  componentWillMount() {
    this.load()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.latestPlannedTransactionGuid !== this.props.latestPlannedTransactionGuid) {
      this.reload()
    }
  }

  load() {
    const date = this.dateFormattedForModel()

    model.get(
      ['projectionsByDate', date, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', date, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => this.setState({projections: response.json.projectionsByDate[date]})
    )
  }

  reload() {
    model.invalidate(['projectionsByDate', this.dateFormattedForModel()])
    this.load()
  }

  dateFormattedForModel() { return this.state.date.format('YYYY-MM-DD') }

  handleSubmit(event) {
    event.preventDefault()
    const date = moment(this.refs.dateInput.value, ["MM|DD|YY"])
    this.setState({ date: date }, () => { this.load() })
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

        <div className="card-block">
          <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input ref="dateInput" defaultValue={this.state.date.format('MM/DD/YY')} className="form-control" type="text" placeholder="Date" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
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

}

module.exports = ProjectionsCard
