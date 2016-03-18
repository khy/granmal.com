var React = require('react')
var _map = require('lodash/collection/map')
var _find = require('lodash/collection/find')

import { formatDate } from 'budget/client/lib/date'
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
    const txn = _find(this.props.results, (txn) => {
      return txn.guid === event.target.dataset.guid
    })

    this.props.onEdit(txn)
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
            <td><a onClick={this.onEditTxn.bind(this)} data-guid={txn.guid} href="#">Edit</a></td>
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
      <Card>
        <CardHeader>
          Transactions

          <CardHeaderLink onClick={this.onNew.bind(this)}>
            New Transaction
          </CardHeaderLink>
        </CardHeader>

        <Table>
          <Thead>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th></th>
          </Thead>
          <Tbody>
            {rows}
          </Tbody>
        </Table>

        <Pager>
          <PagerLink direction="prev" page={linkPages.previous} onClick={this.props.onNewPage.bind(this)}>
            Newer
          </PagerLink>
          <PagerLink direction="next" page={linkPages.next} onClick={this.props.onNewPage.bind(this)}>
            Older
          </PagerLink>
        </Pager>
      </Card>
    )
  }

}
