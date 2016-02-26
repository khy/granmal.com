import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'

import Navbar from '../Navbar'
import { coreClient } from 'budget/client/lib/clients'
import { formatDate } from 'budget/client/lib/date'
import { addContextUser } from 'budget/client/actions/contexts'
import { ActionTypes as AT } from 'budget/client/actions/contexts'
import AddUserModal from './Modal/AddUser'

class Contexts extends React.Component {

  showAddUserModal(event) {
    event.preventDefault()
    this.props.dispatch({type: AT.ShowAddContextUserModal, contextGuid: event.target.dataset.guid})
  }

  hideModal() {
    this.props.dispatch({type: AT.HideContextModal})
  }

  addContextUser(guid) {
    this.props.dispatch(addContextUser(this.props.contexts.modal.contextGuid, guid))
  }

  render() {
    let modal

    console.log(this.props)

    if (this.props.contexts.modal) {
      if (this.props.contexts.modal.type === 'addContextUser') {
        modal = <AddUserModal
          client={coreClient(this.props)}
          onAdd={this.addContextUser.bind(this)}
          onClose={this.hideModal.bind(this)}
        />
      }
    }

    let rows

    if (this.props.app.contexts.length > 0) {
      rows = _map(this.props.app.contexts, (context) => {
        return (
          <tr key={context.guid}>
            <td>{context.createdBy.name}</td>
            <td>{context.name}</td>
            <td>{_map(context.users, (user) => user.name).join(", ")}</td>
            <td>{formatDate(context.createdAt)}</td>
            <td><a onClick={this.showAddUserModal.bind(this)} data-guid={context.guid} href="#">Add User</a></td>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Contexts)
