var React = require('react')
var moment = require('moment')
var _map = require('lodash/collection/map')

class ProjectionsCard extends React.Component {

  onSubmit(event) {
    event.preventDefault()
    const date = moment(this.refs.dateInput.value, ["MM|DD|YY"])
    this.props.onDateChange(date)
  }

  render() {
    const rows = _map(this.props.projections, (value, key) => {
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
                <input ref="dateInput" defaultValue={moment(this.props.date).format('MM/DD/YY')} className="form-control" type="text" placeholder="Date" />
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
