import _map from 'lodash/collection/map'

import model from '../model'

export const ActionTypes = {
  PlannedTxnsReceive: 'PlannedTxnsReceive',
  PlannedTxnsRequest: 'PlannedTxnsRequest',
}

const AT = ActionTypes

export function fetchPlannedTxns() {
  return function (dispatch) {
    dispatch({ type: AT.PlannedTxnsRequest })

    model.get(
      ['plannedTransactions', {from: 0, to: 20}, ['guid', 'minDate', 'maxDate', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 20}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 20}, 'account', ['guid', 'name']]
    ).then( response => {
      dispatch({
        type: AT.PlannedTxnsReceive,
        results: response.json.plannedTransactions,
      })
    })
  }
}
