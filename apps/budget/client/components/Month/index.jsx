import React from 'react'
import { connect } from 'react-redux'

import Navbar from '../Navbar'
import { fetchMonthTxnTypeRollup } from 'budget/client/actions/month'

class Month extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchMonthTxnTypeRollup(this.props.params.year, this.props.params.month))
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>{this.props.params.month}/{this.props.params.year}</h1>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Month)
