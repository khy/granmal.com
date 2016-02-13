import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'

import Navbar from '../Navbar'
import { formatDate } from 'budget/client/lib/date'

class Contexts extends React.Component {

  render() {
    let rows

    if (this.props.app.contexts.length > 0) {
      rows = _map(this.props.app.contexts, (context) => {
        return (
          <tr key={context.guid}>
            <td>{context.createdBy.name}</td>
            <td>{context.name}</td>
            <td>{_map(context.users, (user) => user.name).join(", ")}</td>
            <td>{formatDate(context.createdAt)}</td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="4" className="text-center text-muted">No Contexts</td>
        </tr>
      )
    }

    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>Contexts</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Name</th>
                <th>Users</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Contexts)
