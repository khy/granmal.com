import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _map from 'lodash/collection/map'

import { Card, CardHeader, CardList } from 'client/components/bootstrap/card'
import { showModal, hideModal } from 'budget/client/actions/modal'

import AddTxnTypeModal from 'budget/client/components/modal/AddTxnType'
import AdjustTxnTypeModal from 'budget/client/components/modal/AdjustTxnType'
import {
  ActionTypes as AT, addTxnType, adjustTxnType
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

  showAdjustTxnTypeModal(event) {
    event.preventDefault()
    this.props.dispatch(showModal('AdjustTxnType', {guid: event.target.dataset.guid}))
  }

  hideModal() {
    this.props.dispatch(hideModal())
  }

  addTxnType(newTxnType) {
    newTxnType.contextGuid = this.props.app.selectedContextGuid
    this.props.dispatch(addTxnType(newTxnType))
  }

  adjustTxnType(guid, attributes) {
    this.props.dispatch(adjustTxnType(guid, attributes))
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
      } else if (this.props.modal.name === 'AdjustTxnType') {
        const txnType = this.props.app.txnTypes.find((txnType) => {
          return txnType.guid === this.props.modal.data.guid
        })

        modal = <AdjustTxnTypeModal {...this.props.modal}
          txnType={txnType}
          txnTypes={this.props.app.txnTypes}
          onAdjust={this.adjustTxnType.bind(this)}
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

            <a onClick={this.showAdjustTxnTypeModal.bind(this)} data-guid={h.txnType.guid} className="pull-right" href="#">
              Adjust
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
