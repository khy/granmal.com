import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _map from 'lodash/collection/map'
import _find from 'lodash/collection/find'
import _sum from 'lodash/math/sum'

import { Card, CardHeader, CardList } from 'client/components/bootstrap/card'

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
        const grandAmtTotal = selfAmtTotal + descAmtTotal(h.txnType.guid)

        if (grandAmtTotal > 0) {
          return (
            <tr key={h.txnType.guid}>
              <td className={"td-level-" + h.level}>{h.txnType.name}</td>
              <td className="table-figure">
                {grandAmtTotal}
                <span className="txn-type-self-amt-total">{selfAmtTotal}</span>
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

          <table className="table">
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th className="table-figure">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenseRows}
            </tbody>
          </table>

          <h2>Incomes</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th className="table-figure">Amount</th>
              </tr>
            </thead>
            <tbody>
              {incomeRows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Month)
