var React = require('react')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { getQueryParam, parseLinkHeader } from 'budget/client/lib/http'
import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'

export default class TxnsCard extends React.Component {

  static extractLinkPages(linkHeader) {
    let result = {}

    if (linkHeader) {
      const parsedLinkHeader = parseLinkHeader(linkHeader)

      if (parsedLinkHeader.previous) {
        result.previous = getQueryParam(parsedLinkHeader.previous, 'p.page')
      }

      if (parsedLinkHeader.next) {
        result.next = getQueryParam(parsedLinkHeader.next, 'p.page')
      }
    }

    return result
  }

  onNewPage(event) {
    event.preventDefault()
    this.props.onNewPage(event.target.dataset.page)
  }

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

    const linkPages = TxnsCard.extractLinkPages(this.props.linkHeader)

    let previousPageLink

    if (linkPages.previous) {
      previousPageLink = <li className="pager-prev"><a onClick={this.onNewPage.bind(this)} data-page={linkPages.previous} href="#">Newer</a></li>
    } else {
      previousPageLink = <li className="pager-prev disabled"><a href="#">Newer</a></li>
    }

    let nextPageLink

    if (linkPages.next) {
      nextPageLink = <li className="pager-next"><a onClick={this.onNewPage.bind(this)} data-page={linkPages.next} href="#">Older</a></li>
    } else {
      nextPageLink = <li className="pager-next disabled"><a href="#">Older</a></li>
    }

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
            {previousPageLink}
            {nextPageLink}
          </ul>
        </nav>
      </div>
    )
  }

}
