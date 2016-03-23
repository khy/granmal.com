import _map from 'lodash/collection/map'

import { budgetClient } from 'budget/client/lib/clients'

export const ActionTypes = {
  FetchPlannedTxnReceive: 'FetchPlannedTxnReceive',
  FetchPlannedTxnRequest: 'FetchPlannedTxnRequest',
  PlannedTxnsReceive: 'PlannedTxnsReceive',
  PlannedTxnsRequest: 'PlannedTxnsRequest',
}

const AT = ActionTypes

export function fetchPlannedTxn(guid) {
  return function (dispatch, getState) {
    dispatch({type: AT.FetchPlannedTxnRequest})

    budgetClient(getState()).get(`/plannedTransactions?guid=${guid}`).then((plannedTxns) => {
      dispatch({
        type: AT.FetchPlannedTxnReceive,
        plannedTxn: plannedTxns[0],
      })
    })
  }
}

export function fetchPlannedTxns() {
  return function (dispatch, getState) {
    dispatch({ type: AT.PlannedTxnsRequest })

    budgetClient(getState()).get('/plannedTransactions').then( plannedTxns => {
      dispatch({
        type: AT.PlannedTxnsReceive,
        results: plannedTxns,
      })
    })
  }
}
