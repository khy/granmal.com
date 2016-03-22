import React from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/object/get'
import _pick from 'lodash/object/pick'

import { formatDate } from 'budget/client/lib/date'
import { Table, Tbody } from 'client/components/bootstrap/table'

import { fetchTxn } from 'budget/client/actions/txns'

class Show extends React.Component {

  componentDidMount() {
    this.fetchData(this.props.params.guid)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.guid != nextProps.params.guid) {
      this.fetchData(nextProps.params.guid)
    }
  }

  fetchData(txnGuid) {
    this.props.dispatch(fetchTxn(txnGuid))
  }

  get txn() {
    return _get(this.props.txns, 'show.txn')
  }

  get isFetching() {
    return _get(this.props.txns, 'show.isFetching')
  }

  render() {
    let page

    if (this.txn) {
      page = (
        <Table>
          <Tbody>
            <tr>
              <th>Created By</th>
              <td>{this.txn.createdBy.name || this.txn.createdBy.handle}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{formatDate(this.txn.createdAt)}</td>
            </tr>
          </Tbody>
        </Table>
      )
    } else {
      page = <p>Loading...</p>
    }

    return (
      <div>
        <div className="container">
          <h1>{this.props.params.guid}</h1>
          {page}
        </div>
      </div>
    )
  }

}

const select = (state) => _pick(state, 'app', 'txns')
export default connect(select)(Show)
