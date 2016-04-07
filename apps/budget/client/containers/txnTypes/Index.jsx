import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _map from 'lodash/map'

import { Card, CardHeader, CardList } from 'client/components/bootstrap/card'
import { showModal, hideModal } from 'budget/client/actions/modal'

import AddTxnTypeModal from 'budget/client/components/modal/AddTxnType'
import EditTxnTypeModal from 'budget/client/components/modal/EditTxnType'
import {
  ActionTypes as AT, addTxnType, editTxnType
} from 'budget/client/actions/txnTypes'
import { systemTxnType, txnTypeHierarchyArray } from 'budget/client/lib/txnType'

class TxnTypes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  showAddTxnTypeModal(event) {
    event.preventDefault()
    this.props.dispatch(showModal('AddTxnType', {parentGuid: event.target.dataset.guid}))
  }

  showEditTxnTypeModal(event) {
    event.preventDefault()
    this.props.dispatch(showModal('EditTxnType', {guid: event.target.dataset.guid}))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  addTxnType(newTxnType) {
    newTxnType.contextGuid = this.props.app.selectedContextGuid
    this.props.dispatch(addTxnType(newTxnType))
  }

  editTxnType(guid, attributes) {
    this.props.dispatch(editTxnType(guid, attributes))
  }

  render() {
    let modal

    if (this.props.modal.isVisible) {
      if (this.props.modal.name === 'AddTxnType') {
        const parentTxnType = this.props.app.txnTypes.find((txnType) => {
          return txnType.guid === this.props.modal.data.parentGuid
        })

        modal = <AddTxnTypeModal {...this.props.modal}
          contextGuid={this.props.app.selectedContextGuid}
          parentTxnType={parentTxnType}
          onAdd={this.addTxnType.bind(this)}
          onClose={this.hideModal.bind(this)}
        />
    } else if (this.props.modal.name === 'EditTxnType') {
        const txnType = this.props.app.txnTypes.find((txnType) => {
          return txnType.guid === this.props.modal.data.guid
        })

        modal = <EditTxnTypeModal {...this.props.modal}
          txnType={txnType}
          txnTypes={this.props.app.txnTypes}
          onEdit={this.editTxnType.bind(this)}
          onClose={this.hideModal.bind(this)}
        />
      }
    }

    const buildListGroupItems = (hierarchy) => {
      return _map(hierarchy, (h) => {
        return (
          <li className={"list-group-item list-group-item-level-" + h.level} key={h.txnType.guid}>
            <Link to={`/budget/transactionTypes/${h.txnType.guid}`}>
              {h.txnType.name}
            </Link>

            <a onClick={this.showEditTxnTypeModal.bind(this)} data-guid={h.txnType.guid} className="pull-right" href="#">
              Edit
            </a>
            <a onClick={this.showAddTxnTypeModal.bind(this)} data-guid={h.txnType.guid} className="pull-right" href="#">
              New Child
            </a>
          </li>
        )
      })
    }

    const hierarchyForParent = txnTypeHierarchyArray(this.props.app.txnTypes)
    const systemTxnTypeByName = systemTxnType(this.props.app.txnTypes)

    return (
      <div>
        <div className="container">
          <h1>Transaction Types</h1>

          <Card>
            <CardHeader>
              Expense Types
            </CardHeader>
            <CardList>
              {buildListGroupItems(hierarchyForParent(systemTxnTypeByName("Expense")))}
            </CardList>
          </Card>

          <Card>
            <CardHeader>
              Income Types
            </CardHeader>
            <CardList>
              {buildListGroupItems(hierarchyForParent(systemTxnTypeByName("Income")))}
            </CardList>
          </Card>

          {modal}
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(TxnTypes)
