import _map from 'lodash/collection/map'

import client from 'budget/client/lib/client'

export const ActionTypes = {
  HideModal: 'HideModal',
  PlannedTxnsAddReceive: 'PlannedTxnsAddReceive',
  PlannedTxnsAddRequest: 'PlannedTxnsAddRequest',
  PlannedTxnsFetchReceive: 'PlannedTxnsFetchReceive',
  PlannedTxnsFetchRequest: 'PlannedTxnsFetchRequest',
  PlannedTxnModalShow: 'PlannedTxnModalShow',
  TxnsAddReceive: 'TxnsAddReceive',
  TxnsAddRequest: 'TxnsAddRequest',
  TxnsFetchReceive: 'TxnsFetchReceive',
  TxnsFetchRequest: 'TxnsFetchRequest',
  TxnModalShow: 'TxnModalShow',
}

const AT = ActionTypes

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.PlannedTxnsAddRequest
    })

    client.post('/plannedTransactions', newPlannedTxn).then((plannedTxn) => {
      dispatch(fetchPlannedTxns(plannedTxn.accountGuid))
      dispatch({
        type: AT.PlannedTxnsAddReceive,
        plannedTxn
      })
    })
  }
}

export function addTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.TxnsAddRequest
    })

    client.post('/transactions', newTxn).then((txn) => {
      dispatch(fetchTxns(txn.accountGuid))
      dispatch({
        type: AT.TxnsAddReceive,
        txn
      })
    })
  }
}

export function fetchPlannedTxns(accountGuid, page = 1) {
  return function (dispatch) {
    dispatch({ type: AT.PlannedTxnsFetchRequest })

    const url = '/plannedTransactions?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    client.get(url, true).then(response  => {
      response.json().then(plannedTxns => {
        dispatch({
          type: AT.PlannedTxnsFetchReceive,
          linkHeader: response.headers.get('Link'),
          plannedTxns
        })
      })
    })
  }
}

export function fetchTxns(accountGuid, page = 1) {
  return function (dispatch) {
    dispatch({ type: AT.TxnsFetchRequest })

    const url = '/transactions?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    client.get(url, true).then( response => {
      response.json().then(txns => {
        dispatch({
          type: AT.TxnsFetchReceive,
          linkHeader: response.headers.get('Link'),
          txns
        })
      })
    })
  }
}
