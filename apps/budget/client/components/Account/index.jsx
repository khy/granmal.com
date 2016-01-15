import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import Navbar from '../Navbar'
import PlannedTxns from './Card/PlannedTxns'
import Txns from './Card/Txns'
import { fetchPlannedTxns, fetchTxns } from 'budget/client/actions/account'

class Account extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, 1))
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, 1))
  }

  onNewPlannedTxnPage(page) {
    this.props.dispatch(fetchPlannedTxns(this.props.params.accountGuid, page))
  }

  onNewTxnPage(page) {
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, page))
  }

  render() {
    const account = _find(this.props.app.accounts, (account) => {
      return account.guid === this.props.params.accountGuid
    })

    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>{account.name}</h1>

          <PlannedTxns {...this.props.account.plannedTxns}
            onNewPage={this.onNewPlannedTxnPage.bind(this)}
            app={this.props.app}
          />

          <Txns {...this.props.account.txns}
            onNewPage={this.onNewTxnPage.bind(this)}
            app={this.props.app}
          />
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
