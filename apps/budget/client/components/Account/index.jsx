import React from 'react'
import { connect } from 'react-redux'

import Navbar from '../Navbar'

class Account extends React.Component {

  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>Account {this.props.params.accountGuid}</h1>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Account)
