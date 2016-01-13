import React from 'react'
import { connect } from 'react-redux'
import _find from 'lodash/collection/find'

import Navbar from '../Navbar'
import Txns from './Card/Txns'
import { fetchTxns } from 'budget/client/actions/account'

class Account extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchTxns(this.props.params.accountGuid, 1))
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

            <Txns {...this.props.account.txns}
              app={this.props.app}
            />
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
