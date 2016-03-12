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
    let listItems

    if (!this.props.months.show.txnTypeRollups.isFetching) {
      const expense = systemTxnType(this.props.app.txnTypes)("Expense")
      const expenseHierarchy = txnTypeHierarchyArray(this.props.app.txnTypes)(expense)

      const descendantAmtTotal = (guid) => _sum(
        _map(this.props.months.show.txnTypeRollups.rollups, (rollup) => {
          if (rollup.transactionType.parentGuid === guid) {
            return rollup.transactionAmountTotal + descendantAmtTotal(rollup.transactionType.guid)
          } else {
            return 0
          }
        })
      )

      const txnTypeAmtTotal = (guid) => {
        const rollup = _find(this.props.months.show.txnTypeRollups.rollups, (rollup) => {
          return rollup.transactionType.guid === guid
        })
        return rollup ? rollup.transactionAmountTotal : 0.0
      }

      listItems = _map(expenseHierarchy, (h) => {
        return (
          <li className={"list-group-item list-group-item-level-" + h.level} key={h.txnType.guid}>
            {h.txnType.name}
            <span className="pull-right">
              {txnTypeAmtTotal(h.txnType.guid) + descendantAmtTotal(h.txnType.guid)}
            </span>
            <span className="pull-right">
              {txnTypeAmtTotal(h.txnType.guid)}
            </span>
            <span className="pull-right">
              {descendantAmtTotal(h.txnType.guid)}
            </span>
          </li>
        )
      })
    }

    return (
      <div>
        <div className="container">
          <h1>{this.moment.format("MMMM 'YY")}</h1>

          <Card>
            <CardHeader>
              Expense Transaction Types
            </CardHeader>
            <CardList>
              {listItems}
            </CardList>
          </Card>
        </div>
      </div>
    )
  }

}

function select(state) { return state }
export default connect(select)(Month)
