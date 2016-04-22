import React from 'react'
import { Link } from 'react-router'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _sum from 'lodash/sum'
import moment from 'moment'

import { formatDate } from 'budget/client/lib/date'
import { formatCurrency } from 'budget/client/lib/format'
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

  onAddTxn(event) {
    event.preventDefault()

    var plannedTxn = _find(this.props.plannedTxns, (plannedTxn) => {
      return plannedTxn.guid === event.target.dataset.guid
    })

    this.props.onAddTxn(plannedTxn)
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

    let rows

    if (this.props.plannedTxns.length > 0) {
      rows = _map(this.props.plannedTxns, (plannedTxn) => {
        const minDate = formatDate(plannedTxn.minDate)
        const maxDate = formatDate(plannedTxn.maxDate)
        const date = (minDate === maxDate) ?
          minDate : minDate + " / " + maxDate

        const txnCount = plannedTxn.transactions.length

        const amount = (plannedTxn.minAmount === plannedTxn.maxAmount) ?
          formatCurrency(plannedTxn.minAmount) :
          formatCurrency(plannedTxn.minAmount) +  " / " + formatCurrency(plannedTxn.maxAmount)

        const rowClass = (moment(plannedTxn.minDate) < moment() && txnCount === 0) ?
          'table-warning' : ''

        const txnType = _find(this.props.txnTypes, (txnType) => {
          return txnType.guid === plannedTxn.transactionTypeGuid
        })

        const account = _find(this.props.accounts, (account) => {
          return account.guid === plannedTxn.accountGuid
        })

        const txnAmountTotal = _sum(_map(plannedTxn.transactions, (txn) => txn.amount))

        let addTxnLink

        if (this.props.onAddTxn) {
          addTxnLink = <a onClick={this.onAddTxn.bind(this)} data-guid={plannedTxn.guid} className="add-txn-link" href="#">Add</a>
        }

        const txns = (
          <span>
            {`${txnCount} / ${txnAmountTotal}`}
            {addTxnLink}
          </span>
        )

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
            <td>{plannedTxn.name}</td>
            <td>{txns}</td>
          </tr>
        )
      })
    } else {
      rows = (
        <tr>
          <td colSpan="6" className="text-center text-muted">No Planned Transactions</td>
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
          {this.props.title || 'Planned Transactions'}
          {newLink}
        </CardHeader>

        <Table>
          <Thead>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Name</th>
            <th>Transactions</th>
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
