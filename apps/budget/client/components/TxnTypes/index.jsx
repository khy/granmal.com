import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'


import Navbar from '../Navbar'
import AddTxnTypeModal from './Modal/AddTxnType'
import AdjustTxnTypeModal from './Modal/AdjustTxnType'
import {
  ActionTypes as AT, addTxnType, adjustTxnType
} from 'budget/client/actions/txnTypes'
import { ModalTypes } from 'budget/client/reducers/txnTypes'
import { systemTxnType, txnTypeHierarchyArray } from 'budget/client/lib/txnType'

class TxnTypes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  showAddTxnTypeModal(event) {
    event.preventDefault()
    this.props.dispatch({
      type: AT.ShowAddTxnTypeModal,
      parentGuid: event.target.dataset.guid
    })
  }

  showAdjustTxnTypeModal(event) {
    event.preventDefault()
    this.props.dispatch({
      type: AT.ShowAdjustTxnTypeModal,
      guid: event.target.dataset.guid
    })
  }

  hideModal() {
    this.props.dispatch({type: AT.HideTxnTypeModal})
  }

  addTxnType(newTxnType) {
    this.props.dispatch(addTxnType(newTxnType))
  }

  adjustTxnType(guid, attributes) {
    this.props.dispatch(adjustTxnType(guid, attributes))
  }

  render() {
    let modal

    if (this.props.txnTypes.modal) {
      if (this.props.txnTypes.modal.type === ModalTypes.AddTxnType) {
        const parentTxnType = _find(this.props.app.txnTypes, (txnType) => {
          return txnType.guid === this.props.txnTypes.modal.parentGuid
        })

        modal = <AddTxnTypeModal {...this.props.txnTypes}
          parentTxnType={parentTxnType}
          onAdd={this.addTxnType.bind(this)}
          onClose={this.hideModal.bind(this)}
        />
      } else if (this.props.txnTypes.modal.type === ModalTypes.AdjustTxnType) {
        const txnType = _find(this.props.app.txnTypes, (txnType) => {
          return txnType.guid === this.props.txnTypes.modal.guid
        })

        modal = <AdjustTxnTypeModal {...this.props.txnTypes}
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
            {h.txnType.name}
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
        <Navbar />

        <div className="container">
          <h1>Transaction Types</h1>

          <ul className="list-group">
            {buildListGroupItems(hierarchyForParent(systemTxnTypeByName("Expense")))}
          </ul>

          <ul className="list-group">
            {buildListGroupItems(hierarchyForParent(systemTxnTypeByName("Income")))}
          </ul>

          {modal}
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(TxnTypes)
