import React from 'react'
import Select from 'react-select'
import _map from 'lodash/collection/map'

import { systemTxnType, txnTypeHierarchyArray } from 'budget/client/lib/txnType'

export default class TxnTypeSelect extends React.Component {

  onChange(option) {
    const guid = option ? option.value : undefined
    this.props.onChange(guid)
  }

  render() {
    const txnTypeOptions = (hierarchy) => _map(hierarchy, (h) => {
      return { value: h.txnType.guid, label: h.txnType.name, level: h.level }
    })

    const hierarchyForParent = txnTypeHierarchyArray(this.props.txnTypes)
    const systemTxnTypeByName = systemTxnType(this.props.txnTypes)
    const expenseOptions = txnTypeOptions(hierarchyForParent(systemTxnTypeByName("Expense")))
    const incomeOptions = txnTypeOptions(hierarchyForParent(systemTxnTypeByName("Income")))

    const renderTxnTypeOption = (option) => {
      return <span className={"select-option-level-" + option.level}>{option.label}</span>
    }

    return (
      <Select {...this.props}
        name="txnTypeSelect"
        options={expenseOptions.concat(incomeOptions)}
        optionRenderer={renderTxnTypeOption}
        onChange={this.onChange.bind(this)}
      />
    )
  }

}