import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import Navbar from '../Navbar'
import NavMenuModal from './Modal/NavMenu'
import PlannedTxnModal from './Modal/PlannedTxn'
import TxnModal from './Modal/Txn'
import PlannedTxns from './Card/PlannedTxns'
import Txns from './Card/Txns'
import {
  ActionTypes as AT, addPlannedTxn, addTxn,
  fetchPlannedTxns, fetchTxns
} from 'budget/client/actions/account'

class Account extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menuToggled: false,
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, 1))
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, 1))
  }

  onNewPlannedTxn() {
    this.props.dispatch({type: AT.PlannedTxnModalShow})
  }

  onNewTxn() {
    this.props.dispatch({type: AT.TxnModalShow})
  }

  addPlannedTxn(plannedTxn) {
    this.props.dispatch(addPlannedTxn(plannedTxn))
  }

  addTxn(txn) {
    this.props.dispatch(addTxn(txn))
  }

  onNewPlannedTxnPage(page) {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, page))
  }

  onNewTxnPage(page) {
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, page))
  }

  showMenu() {
    this.setState({menuToggled: true})
  }

  hideMenu() {
    this.setState({menuToggled: false})
  }

  hideModal() {
    this.props.dispatch({ type: AT.HideModal })
  }

  render() {
    const account = _find(this.props.app.accounts, (account) => {
      return account.guid === this.props.params.accountGuid
    })

    let modal

    if (this.state.menuToggled) {
      modal = <NavMenuModal onClose={this.hideMenu.bind(this)} />
    } else if (this.props.account.activeModal === 'plannedTxnModal') {
      modal = <PlannedTxnModal {...this.props.plannedTxnModal}
        app={this.props.app}
        accountGuid={this.props.params.accountGuid}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addPlannedTxn.bind(this)}
      />
    } else if (this.props.account.activeModal === 'txnModal') {
      modal = <TxnModal {...this.props.txnModal}
        app={this.props.app}
        accountGuid={this.props.params.accountGuid}
        onClose={this.hideModal.bind(this)}
        onAdd={this.addTxn.bind(this)}
      />
    }

    return (
      <div>
        <Navbar
          onMenuClick={this.showMenu.bind(this)}
        />

        <div className="container">
          <h1>{account.name}</h1>

          <PlannedTxns {...this.props.account.plannedTxns}
            onNew={this.onNewPlannedTxn.bind(this)}
            onNewPage={this.onNewPlannedTxnPage.bind(this)}
            app={this.props.app}
          />

          <Txns {...this.props.account.txns}
            onNew={this.onNewTxn.bind(this)}
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
