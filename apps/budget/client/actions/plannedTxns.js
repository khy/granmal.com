import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'
import _map from 'lodash/collection/map'

import { getJson } from 'budget/client/lib/client'

export const ActionTypes = {
  PlannedTxnsReceive: 'PlannedTxnsReceive',
  PlannedTxnsRequest: 'PlannedTxnsRequest',
}

const AT = ActionTypes

export function fetchPlannedTxns() {
  return function (dispatch) {
    dispatch({ type: AT.PlannedTxnsRequest })

    getJson('/budget/api/plannedTxns').then( plannedTxns => {
      dispatch({
        type: AT.PlannedTxnsReceive,
        results: plannedTxns,
      })
    })
  }
}
