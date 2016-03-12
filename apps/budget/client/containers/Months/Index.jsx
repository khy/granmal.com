import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _map from 'lodash/collection/map'

import { fetchMonthRollups } from 'budget/client/actions/months'

class Index extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchMonthRollups(this.moment))
  }

  render() {
    let rows

    if (this.props.months.index.isFetching) {
      rows = (
        <tr>
          <td colSpan="1" className="text-center text-muted">Loading...</td>
        </tr>
      )
    } else if (this.props.months.index.rollups.length > 0) {
      rows = _map(this.props.months.index.rollups, (rollup) => {
        return (
          <tr key={`${rollup.year}-${rollup.month}`}>
            <td>
              <Link to={`budget/months/${rollup.year}/${rollup.month}`}>
                {`${rollup.month}/${rollup.year}`}
              </Link>
            </td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="1" className="text-center text-muted">No Transaction History</td>
        </tr>
      )
    }

    return (
      <div>
        <div className="container">
          <h1>Months</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Index)
