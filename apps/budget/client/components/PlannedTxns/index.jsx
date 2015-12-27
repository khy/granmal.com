import React from 'react'
import { connect } from 'react-redux'

import Navbar from '../Navbar'

class PlannedTxns extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Planned Transactions</h1>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(PlannedTxns)
