var React = require('react')
import { Link } from 'react-router'
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')
var moment = require('moment')

import { formatDate } from 'budget/client/lib/date'
import { shortenGuid } from 'budget/client/lib/guid'
import { extractPagerPages } from 'budget/client/lib/pager'
import { Card, CardHeader, CardHeaderLink } from 'client/components/bootstrap/card'
import { Pager, PagerLink } from 'client/components/bootstrap/pagination'
import { Table, Thead, Tbody } from 'client/components/bootstrap/table'

export default class PlannedTxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onResolve(event) {
    event.preventDefault()

    var plannedTxn = _find(this.props.plannedTxns, (plannedTxn) => {
      return plannedTxn.guid === event.target.dataset.guid
    })

    this.props.onResolve(plannedTxn)
  }

  render() {
    let newLink

    if (this.props.onNew) {
      newLink = (
        <CardHeaderLink onClick={this.onNew.bind(this)}>
          New Planned Transaction
        </CardHeaderLink>
      )
    }

    let resolveHeader

    if (this.props.onResolve) {
      resolveHeader = <th></th>
    }

    let rows

    if (this.props.plannedTxns.length > 0) {
      rows = _map(this.props.plannedTxns, (plannedTxn) => {
        const minDate = formatDate(plannedTxn.minDate)
        const maxDate = formatDate(plannedTxn.maxDate)
        const date = (minDate === maxDate) ?
          minDate : minDate + " / " + maxDate

        const amount = (plannedTxn.minAmount === plannedTxn.maxAmount) ?
          plannedTxn.minAmount : plannedTxn.minAmount +  " / " + plannedTxn.maxAmount

        const rowClass = (moment(plannedTxn.minDate) < moment()) ?
          'table-warning' : ''

        const txnType = _find(this.props.txnTypes, (txnType) => {
          return txnType.guid === plannedTxn.transactionTypeGuid
        })

        const account = _find(this.props.accounts, (account) => {
          return account.guid === plannedTxn.accountGuid
        })

        let resolveRow

        if (this.props.onResolve) {
          resolveRow = <td><a onClick={this.onResolve.bind(this)} data-guid={plannedTxn.guid} href="#">Resolve</a></td>
        }

        return (
          <tr key={plannedTxn.guid} className={rowClass}>
            <td>
              <Link to={`/budget/plannedTransactions/${plannedTxn.guid}`}>
                {shortenGuid(plannedTxn.guid)}
              </Link>
            </td>
            <td>{date}</td>
            <td>{amount}</td>
            <td>{txnType.name}</td>
            {resolveRow}
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

    let pager

    if (this.props.linkHeader && this.props.onNewPage) {
      const pagerPages = extractPagerPages(this.props.linkHeader)

      pager = (
        <Pager>
          <PagerLink direction="prev" page={pagerPages.previous} onClick={this.props.onNewPage.bind(this)}>
            Newer
          </PagerLink>
          <PagerLink direction="next" page={pagerPages.next} onClick={this.props.onNewPage.bind(this)}>
            Older
          </PagerLink>
        </Pager>
      )
    }



    return (
      <Card>
        <CardHeader>
          Planned Transactions
          {newLink}
        </CardHeader>

        <Table>
          <Thead>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            {resolveHeader}
          </Thead>
          <Tbody>
            {rows}
          </Tbody>
        </Table>

        {pager}
      </Card>
    )
  }

}
