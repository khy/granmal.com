import _map from 'lodash/collection/map'

import { getJson } from 'budget/client/lib/client'

export const ActionTypes = {
  FetchTxnsReceive: 'FetchTxnsReceive',
  FetchTxnsRequest: 'FetchTxnsRequest',
}

const AT = ActionTypes

export function fetchTxns(accountGuid) {
  return function (dispatch) {
    dispatch({ type: AT.FetchTxnsRequest })

    getJson('/budget/api/txns?accountGuid=' + accountGuid).then( txns => {
      dispatch({
        type: AT.FetchTxnsReceive,
        txns
      })
    })
  }
}
