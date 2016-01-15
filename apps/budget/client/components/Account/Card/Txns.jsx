var React = require('react')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { PagerLink } from 'client/components/pagination/Pager'
import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'
import { extractPagerPages } from 'budget/client/lib/pager'

export default class TxnsCard extends React.Component {

  render() {
    let rows

    if (Object.keys(this.props.results).length > 0) {
      rows = _map(this.props.results, (txn) => {
        const txnType = _find(this.props.app.txnTypes, (txnType) => {
          return txnType.guid === txn.transactionTypeGuid
        })

        const account = _find(this.props.app.accounts, (account) => {
          return account.guid === txn.accountGuid
        })

        return (
          <tr key={txn.guid}>
            <td>{shortenGuid(txn.guid)}</td>
            <td>{formatDate(txn.date)}</td>
            <td>{txn.amount}</td>
            <td>{txnType.name}</td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="4" className="text-center text-muted">No Transactions</td>
        </tr>
      )
    }

    const linkPages = extractPagerPages(this.props.linkHeader)

    return (
      <div className="card">
        <div className="card-header">
          Transactions
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <nav>
          <ul className="pager">
            <PagerLink direction="prev" page={linkPages.previous} onClick={this.props.onNewPage.bind(this)}>
              Newer
            </PagerLink>
            <PagerLink direction="next" page={linkPages.next} onClick={this.props.onNewPage.bind(this)}>
              Older
            </PagerLink>
          </ul>
        </nav>
      </div>
    )
  }

}
