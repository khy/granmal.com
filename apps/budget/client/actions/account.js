import _map from 'lodash/collection/map'

import { getJson } from 'budget/client/lib/client'

export const ActionTypes = {
  FetchTxnsReceive: 'FetchTxnsReceive',
  FetchTxnsRequest: 'FetchTxnsRequest',
  PlannedTxnsFetchReceive: 'PlannedTxnsFetchReceive',
  PlannedTxnsFetchRequest: 'PlannedTxnsFetchRequest',
}

const AT = ActionTypes

export function fetchPlannedTxns(accountGuid, page = 1) {
  return function (dispatch) {
    dispatch({ type: AT.PlannedTxnsFetchRequest })

    const url = '/budget/api/plannedTxns?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    getJson(url).then( plannedTxns => {
      dispatch({
        type: AT.PlannedTxnsFetchReceive,
        plannedTxns
      })
    })
  }
}

export function fetchTxns(accountGuid, page = 1) {
  return function (dispatch) {
    dispatch({ type: AT.FetchTxnsRequest })

    const url = '/budget/api/txns?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    getJson(url).then( txns => {
      dispatch({
        type: AT.FetchTxnsReceive,
        txns
      })
    })
  }
}
