import React from 'react'
import _toLower from 'lodash/toLower'

import { SecondaryButton } from 'client/components/bootstrap/button'

export default class TxnTypeButtonGroup extends React.Component {

  get expenseSelected() {
    return _toLower(this.props.txnType) === 'expense'
  }

  get incomeSelected() {
    return _toLower(this.props.txnType) === 'income'
  }

  render() {
    return (
      <div className="btn-group transaction-type-buttons">
        <SecondaryButton
          className={this.expenseSelected ? 'active' : false}
          disabled={this.expenseSelected}
          onClick={this.props.onClick.bind(this, "Expense")}
        >
          Expense
        </SecondaryButton>
        <SecondaryButton
          className={this.incomeSelected ? 'active' : false}
          disabled={this.incomeSelected}
          onClick={this.props.onClick.bind(this, "Income")}
        >
          Income
        </SecondaryButton>
      </div>
    )
  }

}
