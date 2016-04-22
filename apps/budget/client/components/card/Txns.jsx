import React from 'react'
import _map from 'lodash/map'
import _find from 'lodash/find'
import { Link } from 'react-router'

import { formatDate } from 'budget/client/lib/date'
import { formatCurrency } from 'budget/client/lib/currency'
import { shortenGuid } from 'budget/client/lib/guid'
import { extractPagerPages } from 'budget/client/lib/pager'
import { Card, CardHeader, CardHeaderLink } from 'client/components/bootstrap/card'
import { Pager, PagerLink } from 'client/components/bootstrap/pagination'
import { Table, Thead, Tbody } from 'client/components/bootstrap/table'

export default class TxnsCard extends React.Component {

  onNew(event) {
    event.preventDefault()
    this.props.onNew()
  }

  onEditTxn(event) {
    const txn = _find(this.props.txns, (txn) => {
      return txn.guid === event.target.dataset.guid
    })

    this.props.onEdit(txn)
  }

  render() {
    let newLink

    if (this.props.onNew) {
      newLink = (
        <CardHeaderLink onClick={this.onNew.bind(this)}>
          New Transaction
        </CardHeaderLink>
      )
    }

    let editHeader

    if (this.props.onEdit) {
      editHeader = <th></th>
    }

    let rows

    if (this.props.txns.length > 0) {
      rows = _map(this.props.txns, (txn) => {
        const txnType = _find(this.props.txnTypes, (txnType) => {
          return txnType.guid === txn.transactionTypeGuid
        })

        const account = _find(this.props.accounts, (account) => {
          return account.guid === txn.accountGuid
        })

        let editRow

        if (this.props.onEdit) {
          editRow = <td><a onClick={this.onEditTxn.bind(this)} data-guid={txn.guid} href="#">Edit</a></td>
        }

        return (
          <tr key={txn.guid}>
            <td>
              <Link to={`/budget/transactions/${txn.guid}`}>
                {shortenGuid(txn.guid)}
              </Link>
            </td>
            <td>{formatDate(txn.date)}</td>
            <td>{formatCurrency(txn.amount)}</td>
            <td>{txnType.name}</td>
            <td>{txn.name}</td>
            {editRow}
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

    let pager

    if (this.props.linkHeader && this.props.onNewPage) {
      const linkPages = extractPagerPages(this.props.linkHeader)

      pager = (
        <Pager>
          <PagerLink direction="prev" page={linkPages.previous} onClick={this.props.onNewPage.bind(this)}>
            Newer
          </PagerLink>
          <PagerLink direction="next" page={linkPages.next} onClick={this.props.onNewPage.bind(this)}>
            Older
          </PagerLink>
        </Pager>
      )
    }

    return (
      <Card>
        <CardHeader>
          Transactions
          {newLink}
        </CardHeader>

        <Table>
          <Thead>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Name</th>
            {editHeader}
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
