var React = require('react')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')
var moment = require('moment')

import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'
import { extractPagerPages } from 'budget/client/lib/pager'
import { PagerLink } from 'client/components/pagination/Pager'

export default class PlannedTxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  render() {
    let rows

    if (Object.keys(this.props.results).length > 0) {
      rows = _map(this.props.results, (plannedTxn) => {
        const minDate = formatDate(plannedTxn.minDate)
        const maxDate = formatDate(plannedTxn.maxDate)
        const date = (minDate === maxDate) ?
          minDate : minDate + " / " + maxDate

        const amount = (plannedTxn.minAmount === plannedTxn.maxAmount) ?
          plannedTxn.minAmount : plannedTxn.minAmount +  " / " + plannedTxn.maxAmount

        const rowClass = (moment(plannedTxn.minDate) < moment()) ?
          'table-warning' : ''

        const txnType = _find(this.props.app.txnTypes, (txnType) => {
          return txnType.guid === plannedTxn.transactionTypeGuid
        })

        const account = _find(this.props.app.accounts, (account) => {
          return account.guid === plannedTxn.accountGuid
        })

        return (
          <tr key={plannedTxn.guid} className={rowClass}>
            <td>{shortenGuid(plannedTxn.guid)}</td>
            <td>{date}</td>
            <td>{amount}</td>
            <td>{txnType.name}</td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="4" className="text-center text-muted">No Planned Transactions</td>
        </tr>
      )
    }

    const pagerPages = extractPagerPages(this.props.linkHeader)

    return (
      <div className="card">
        <div className="card-header">
          Planned Transactions

          <a className="pull-right" onClick={this.onNew.bind(this)} href="#">
            New Planned Transaction
          </a>
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
            <PagerLink direction="prev" page={pagerPages.previous} onClick={this.props.onNewPage.bind(this)}>
              Newer
            </PagerLink>
            <PagerLink direction="next" page={pagerPages.next} onClick={this.props.onNewPage.bind(this)}>
              Older
            </PagerLink>
          </ul>
        </nav>
      </div>
    )
  }

}
