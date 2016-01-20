import React from 'react'
import { connect } from 'react-redux'

import Navbar from '../Navbar'

class TxnTypes extends React.Component {

  render() {

    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>Transaction Types</h1>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(TxnTypes)
