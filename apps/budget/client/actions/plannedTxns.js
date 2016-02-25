import _map from 'lodash/collection/map'

import client from 'budget/client/lib/clients'

export const ActionTypes = {
  PlannedTxnsReceive: 'PlannedTxnsReceive',
  PlannedTxnsRequest: 'PlannedTxnsRequest',
}

const AT = ActionTypes

export function fetchPlannedTxns() {
  return function (dispatch, getState) {
    dispatch({ type: AT.PlannedTxnsRequest })

    client(getState()).get('/plannedTransactions').then( plannedTxns => {
      dispatch({
        type: AT.PlannedTxnsReceive,
        results: plannedTxns,
      })
    })
  }
}
