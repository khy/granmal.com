import _map from 'lodash/collection/map'

import client from 'budget/client/lib/uselessClient'

export const ActionTypes = {
  PlannedTxnsReceive: 'PlannedTxnsReceive',
  PlannedTxnsRequest: 'PlannedTxnsRequest',
}

const AT = ActionTypes

export function fetchPlannedTxns() {
  return function (dispatch) {
    dispatch({ type: AT.PlannedTxnsRequest })

    client.get('/plannedTransactions').then( plannedTxns => {
      dispatch({
        type: AT.PlannedTxnsReceive,
        results: plannedTxns,
      })
    })
  }
}
