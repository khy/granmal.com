import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'

import { coreClient } from 'budget/client/lib/clients'
import { formatDate } from 'budget/client/lib/date'
import { ActionTypes as AT, addContextUser } from 'budget/client/actions/contexts'
import { selectContext } from 'budget/client/actions/app'
import { showModal, hideModal } from 'budget/client/actions/modal'
import AddUserModal from './Modal/AddUser'

class Contexts extends React.Component {

  selectContext(event) {
    this.props.dispatch(selectContext(event.target.value))
  }

  showAddUserModal(event) {
    event.preventDefault()
    this.props.dispatch(showModal('addContextUser', {contextGuid: event.target.dataset.guid}))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  addContextUser(contextGuid, userGuid) {
    this.props.dispatch(addContextUser(contextGuid, userGuid))
  }

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'addContextUser') {
        modal = <AddUserModal {...this.props.modal}
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
            <td>
              <input
                type="radio"
                name="selectedContext"
                value={context.guid}
                checked={this.props.app.selectedContextGuid === context.guid}
                onChange={this.selectContext.bind(this)}
              />
            </td>
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
        <div className="container">
          <h1>Contexts</h1>

          <table className="table">
            <thead>
              <tr>
                <th></th>
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
