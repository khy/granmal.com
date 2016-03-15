import React from 'react'
import { connect } from 'react-redux'

class Show extends React.Component {

  render() {

    return (
      <div>
        <div className="container">
          <h1>Transaction Type {this.props.params.guid}</h1>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Show)
