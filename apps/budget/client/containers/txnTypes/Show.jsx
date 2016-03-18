import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _find from 'lodash/collection/find'
import _filter from 'lodash/collection/filter'
import _map from 'lodash/collection/map'
import _pick from 'lodash/object/pick'
import _get from 'lodash/object/get'

import { formatDate } from 'budget/client/lib/date'
import { Table, Tbody } from 'client/components/bootstrap/table'

import { fetchTxnTypeTxns } from 'budget/client/actions/txnTypes'
import Txns from 'budget/client/components/card/Txns'

class Show extends React.Component {

  componentDidMount() {
    this.fetchData(this.txnType.guid)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.guid != nextProps.params.guid) {
      this.fetchData(nextProps.params.guid)
    }
  }

  fetchData(txnTypeGuid) {
    this.props.dispatch(fetchTxnTypeTxns(txnTypeGuid))
  }

  get txnType() {
    return _find(this.props.app.txnTypes, (txnType) => {
      return txnType.guid === this.props.params.guid
    })
  }

  get parentTxnType() {
    return _find(this.props.app.txnTypes, (txnType) => {
      return txnType.guid === this.txnType.parentGuid
    })
  }

  get childrenTxnTypes() {
    return _filter(this.props.app.txnTypes, (txnType) => {
      return txnType.parentGuid === this.txnType.guid
    })
  }

  get txns() {
    return _get(this.props.txnTypes, 'show.txns.records', [])
  }

  render() {
    let parentTag

    if (this.parentTxnType) {
      parentTag = (
        <Link to={`/budget/transactionTypes/${this.parentTxnType.guid}`}>
          {this.parentTxnType.name}
        </Link>
      )
    } else {
      parentTag = <span className="text-muted">No Parent</span>
    }

    let childrenTags

    if (this.childrenTxnTypes.length > 0) {
      const links = _map(this.childrenTxnTypes, (txnType, idx, txnTypes) => {
        const link = (
          <Link to={`/budget/transactionTypes/${txnType.guid}`}>
            {txnType.name}
          </Link>
        )

        if (idx == txnTypes.length - 1) {
          return <span key={txnType.guid}>{link}</span>
        } else {
          return <span key={txnType.guid}>{link}, </span>
        }
      })

      childrenTags = <span>{links}</span>
    } else {
      childrenTags = <span className="text-muted">No Children</span>
    }

    return (
      <div>
        <div className="container">
          <h1>{this.txnType.name}</h1>

          <Table>
            <Tbody>
              <tr>
                <th>Parent</th>
                <td>{parentTag}</td>
              </tr>
              <tr>
                <th>Children</th>
                <td>{childrenTags}</td>
              </tr>
              <tr>
                <th>Created By</th>
                <td>{this.txnType.createdBy.name || this.txnType.createdBy.handle}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{formatDate(this.txnType.createdAt)}</td>
              </tr>
            </Tbody>
          </Table>

          <Txns
            txns={this.txns}
            txnTypes={this.props.app.txnTypes}
            accounts={this.props.app.accounts}
          />
        </div>
      </div>
    )
  }

}

const select = (state) => _pick(state, 'app', 'txnTypes')
export default connect(select)(Show)
