import React from 'react'
import { Link } from 'react-router'
import _map from 'lodash/map'

import { Table, Tbody, Thead } from 'client/components/bootstrap/table'

import { formatCurrency } from 'budget/client/lib/currency'
import { UserActionTypes } from 'budget/client/actions/overview'
import { normalizeDateInput, formatDate, formatDateForModel } from 'budget/client/lib/date'

class ProjectionsCard extends React.Component {

  onNewTransfer(event) {
    event.preventDefault()
    this.props.onNewTransfer()
  }

  onNewAccount(event) {
    event.preventDefault()
    this.props.onNewAccount()
  }

  onSubmit(event) {
    event.preventDefault()
    const date = normalizeDateInput(this.refs.dateInput.value)
    this.props.onDateChange(date)
  }

  render() {
    let rows

    if (Object.keys(this.props.projections).length > 0) {
      rows = _map(this.props.projections, (value, key) => {
        return (
          <tr key={value.account.guid}>
            <td><Link to={"/budget/accounts/" + value.account.guid}>{value.account.name}</Link></td>
            <td>{formatCurrency(value.account.balance)}</td>
            <td>{formatCurrency(value.minBalance)}</td>
            <td>{formatCurrency(value.maxBalance)}</td>
          </tr>
        )
      })
    } else {
      const rowsMessage = this.props.isFetching ? "Loading" : "No Projections"

      rows = (
        <tr>
          <td colSpan="6" className="text-center text-muted">{rowsMessage}</td>
        </tr>
      )
    }

    let message

    if (this.props.lastUserAction) {
      if (this.props.lastUserAction.type === UserActionTypes.AddAccount) {
        message = (
          <div className="card-block card-message">
            <p className="card-text text-success">
              Added account <strong>{this.props.lastUserAction.name}</strong>.
            </p>
          </div>
        )
      }
    }

    return (
      <div className="card">
        <div className="card-header">
          Projections

          <a className="pull-xs-right" onClick={this.onNewTransfer.bind(this)} href="#">
            New Transfer
          </a>

          <a className="pull-xs-right" onClick={this.onNewAccount.bind(this)} href="#">
            New Account
          </a>
        </div>

        {message}

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

        <Table>
          <Thead>
            <th>Account</th>
            <th>Current Balance</th>
            <th>Min Balance</th>
            <th>Max Balance</th>
          </Thead>
          <Tbody>
            {rows}
          </Tbody>
        </Table>
      </div>
    )
  }

}

module.exports = ProjectionsCard
