import React from 'react'
import { connect } from 'react-redux'
import _map from 'lodash/collection/map'
import _find from 'lodash/collection/find'

import Navbar from '../Navbar'
import AddTxnTypeModal from './Modal/AddTxnType'

class TxnTypes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  showModal(event) {
    event.preventDefault()
    this.setState({modalGuid: event.target.dataset.guid})
  }

  hideModal() {
    this.setState({modalGuid: undefined})
  }

  addTxnType(newTxnType) {
    console.log(newTxnType)
  }

  render() {
    let modal

    if (this.state.modalGuid) {
      const txnType = _find(this.props.app.txnTypes, (txnType) => {
        return txnType.guid === this.state.modalGuid
      })

      modal = <AddTxnTypeModal
        parentTxnType={txnType}
        onAdd={this.addTxnType.bind(this)}
        onClose={this.hideModal.bind(this)}
      />
    }

    const txnTypeListGroupItems = (
      _map(this.props.app.txnTypes, (txnType) => {
        return (
          <li className="list-group-item" key={txnType.guid}>
            {txnType.name}
            <a onClick={this.showModal.bind(this)} data-guid={txnType.guid} href="#" className="pull-right">
              New Child
            </a>
          </li>
        )
      })
    )

    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>Transaction Types</h1>

          <ul className="list-group">
            {txnTypeListGroupItems}
          </ul>

          {modal}
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(TxnTypes)
