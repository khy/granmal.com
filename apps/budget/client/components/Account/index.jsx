import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import Navbar from '../Navbar'
import PlannedTxnModal from './Modal/PlannedTxn'
import PlannedTxns from './Card/PlannedTxns'
import Txns from './Card/Txns'
import {
  ActionTypes as AT, addPlannedTxn, fetchPlannedTxns,
  fetchTxns
} from 'budget/client/actions/account'

class Account extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, 1))
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, 1))
  }

  onNewPlannedTxn() {
    this.props.dispatch({type: AT.PlannedTxnModalShow})
  }

  addPlannedTxn(plannedTxn) {
    this.props.dispatch(addPlannedTxn(plannedTxn))
  }

  onNewPlannedTxnPage(page) {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, page))
  }

  onNewTxnPage(page) {
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, page))
  }

  hideModal() {
    this.props.dispatch({ type: AT.HideModal })
  }

  render() {
    const account = _find(this.props.app.accounts, (account) => {
      return account.guid === this.props.params.accountGuid
    })

    let modal

    console.log(this.props)

    if (this.props.account.activeModal === 'plannedTxnModal') {
      modal = <PlannedTxnModal {...this.props.plannedTxnModal}
        app={this.props.app}
        accountGuid={this.props.params.accountGuid}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    }

    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>{account.name}</h1>

          <PlannedTxns {...this.props.account.plannedTxns}
            onNew={this.onNewPlannedTxn.bind(this)}
            onNewPage={this.onNewPlannedTxnPage.bind(this)}
            app={this.props.app}
          />

          <Txns {...this.props.account.txns}
            onNewPage={this.onNewTxnPage.bind(this)}
            app={this.props.app}
          />
        </div>

        {modal}
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
