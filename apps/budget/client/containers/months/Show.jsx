import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _sum from 'lodash/sum'

import { Card, CardHeader, CardList } from 'client/components/bootstrap/card'
import { Table, Tbody, Thead } from 'client/components/bootstrap/table'

import { formatCurrency } from 'budget/client/lib/format'
import { systemTxnType, txnTypeHierarchyArray } from 'budget/client/lib/txnType'
import { fetchMonthTxnTypeRollup } from 'budget/client/actions/months'


class Month extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchMonthTxnTypeRollup(this.moment))
  }

  get moment() {
    return moment(this.props.params.year + "-" + this.props.params.month, "YYYY-MM")
  }

  render() {
    let expenseRows
    let incomeRows

    if (!this.props.months.show.txnTypeRollups.isFetching) {
      const expense = systemTxnType(this.props.app.txnTypes)("Expense")
      const expenseHierarchy = txnTypeHierarchyArray(this.props.app.txnTypes)(expense)

      const income = systemTxnType(this.props.app.txnTypes)("Income")
      const incomeHierarchy = txnTypeHierarchyArray(this.props.app.txnTypes)(income)

      const descAmtTotal = (guid) => _sum(
        _map(this.props.months.show.txnTypeRollups.rollups, (rollup) => {
          if (rollup.transactionType.parentGuid === guid) {
            return rollup.transactionAmountTotal + descAmtTotal(rollup.transactionType.guid)
          } else {
            return 0
          }
        })
      )

      const amtTotal = (guid) => {
        const rollup = _find(this.props.months.show.txnTypeRollups.rollups, (rollup) => {
          return rollup.transactionType.guid === guid
        })
        return rollup ? rollup.transactionAmountTotal : 0.0
      }

      const buildRows = (hierarchy) => _map(hierarchy, (h) => {
        const selfAmtTotal = amtTotal(h.txnType.guid)
        const grandAmtTotal = formatCurrency(selfAmtTotal + descAmtTotal(h.txnType.guid))

        if (grandAmtTotal != 0) {
          let selfAmtTotalSpan

          if (selfAmtTotal != 0 && selfAmtTotal != grandAmtTotal) {
            selfAmtTotalSpan = <span className="txn-type-self-amt-total">{formatCurrency(selfAmtTotal)}</span>
          }

          return (
            <tr key={h.txnType.guid}>
              <td className={"td-level-" + h.level}>
                <Link to={`/budget/transactionTypes/${h.txnType.guid}`}>
                  {h.txnType.name}
                </Link>
              </td>
              <td className="table-figure">
                {grandAmtTotal}
                {selfAmtTotalSpan}
              </td>
            </tr>
          )
        }
      })

      expenseRows = buildRows(expenseHierarchy)
      incomeRows = buildRows(incomeHierarchy)
    }

    return (
      <div>
        <div className="container">
          <h1>{this.moment.format("MMMM 'YY")}</h1>

          <h2>Expenses</h2>

          <Table>
            <Thead>
              <th>Transaction Type</th>
              <th className="table-figure">Amount</th>
            </Thead>
            <Tbody>
              {expenseRows}
            </Tbody>
          </Table>

          <h2>Incomes</h2>

          <Table>
            <Thead>
              <th>Transaction Type</th>
              <th className="table-figure">Amount</th>
            </Thead>
            <Tbody>
              {incomeRows}
            </Tbody>
          </Table>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Month)
