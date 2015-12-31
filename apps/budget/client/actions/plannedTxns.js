import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'
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

    fetch('/budget/api/plannedTxns', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'same-origin',
    }).then((response) => {
      return response.json()
    }).then((plannedTxns) => {
      dispatch({
        type: AT.PlannedTxnsReceive,
        results: plannedTxns,
      })
    })
  }
}
