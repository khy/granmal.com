var React = require('react')
var _map = require('lodash/collection/map')

import { normalizeDateInput, formatDate, formatDateForModel } from 'budget/client/lib/date'

class ProjectionsCard extends React.Component {

  onSubmit(event) {
    event.preventDefault()
    const date = normalizeDateInput(this.refs.dateInput.value)
    this.props.onDateChange(date)
  }

  render() {
    const projectionDateForModel = formatDateForModel(this.props.date)
    let projections

    if (this.props.projectionsByDate && this.props.projectionsByDate[projectionDateForModel]) {
      projections = this.props.projectionsByDate[projectionDateForModel]
    } else {
      projections = []
    }

    const rows = _map(projections, (value, key) => {
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
          <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
            <fieldset disabled={this.props.isFetching}>
              <div className="form-group">
                <input ref="dateInput" defaultValue={formatDate(this.props.date)} className="form-control" type="text" placeholder="Date" />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
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
