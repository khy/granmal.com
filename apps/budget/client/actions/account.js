import _map from 'lodash/collection/map'

import { getJson, postJson } from 'budget/client/lib/client'

export const ActionTypes = {
  HideModal: 'HideModal',
  PlannedTxnsAddReceive: 'PlannedTxnsAddReceive',
  PlannedTxnsAddRequest: 'PlannedTxnsAddRequest',
  PlannedTxnsFetchReceive: 'PlannedTxnsFetchReceive',
  PlannedTxnsFetchRequest: 'PlannedTxnsFetchRequest',
  PlannedTxnModalShow: 'PlannedTxnModalShow',
  TxnsFetchReceive: 'TxnsFetchReceive',
  TxnsFetchRequest: 'TxnsFetchRequest',
}

const AT = ActionTypes

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.PlannedTxnsAddRequest
    })

    postJson('/budget/api/plannedTxns', newPlannedTxn).then((plannedTxn) => {
      dispatch(fetchPlannedTxns(plannedTxn.accountGuid))
      dispatch({
        type: AT.PlannedTxnsAddReceive,
        plannedTxn
      })
    })
  }
}

export function fetchPlannedTxns(accountGuid, page = 1) {
  return function (dispatch) {
    dispatch({ type: AT.PlannedTxnsFetchRequest })

    const url = '/budget/api/plannedTxns?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    getJson(url, true).then(response  => {
      response.json().then(plannedTxns => {
        dispatch({
          type: AT.PlannedTxnsFetchReceive,
          linkHeader: response.headers.get('X-Useless-Link'),
          plannedTxns
        })
      })
    })
  }
}

export function fetchTxns(accountGuid, page = 1) {
  return function (dispatch) {
    dispatch({ type: AT.TxnsFetchRequest })

    const url = '/budget/api/txns?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    getJson(url, true).then( response => {
      response.json().then(txns => {
        dispatch({
          type: AT.TxnsFetchReceive,
          linkHeader: response.headers.get('X-Useless-Link'),
          txns
        })
      })
    })
  }
}
