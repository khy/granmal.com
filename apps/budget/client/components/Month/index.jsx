import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _map from 'lodash/collection/map'

import Navbar from '../Navbar'
import { fetchMonthTxnTypeRollup } from 'budget/client/actions/month'

class Month extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchMonthTxnTypeRollup(this.moment))
  }

  get moment() {
    return moment(this.props.params.year + "-" + this.props.params.month, "YYYY-MM")
  }

  render() {
    let listItems

    if (this.props.month.rollups) {
      listItems = _map(this.props.month.rollups.rollups, (rollup) => {
        return (<li className="list-group-item" key={rollup.transactionType.guid}>
          {rollup.transactionType.name}
          <span className="pull-right">
            {rollup.transactionAmountTotal}
          </span>
        </li>)
      })
    }

    return (
      <div>
        <Navbar />

        <div className="container">
          <h1>{this.moment.format("MMMM 'YY")}</h1>

          <ul className="list-group">
            {listItems}
          </ul>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Month)
