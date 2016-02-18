import _map from 'lodash/collection/map'

import client from 'budget/client/lib/client'

export const ActionTypes = {
  AddTxnsReceive: 'AddTxnsReceive',
  AddTxnsRequest: 'AddTxnsRequest',
  EditTxnModalShow: 'EditTxnModalShow',
  EditTxnReceive: 'EditTxnReceive',
  EditTxnRequest: 'EditTxnRequest',
  DeleteTxnReceive: 'DeleteTxnReceive',
  DeleteTxnRequest: 'DeleteTxnRequest',
  HideModal: 'HideModal',
  PlannedTxnsAddReceive: 'PlannedTxnsAddReceive',
  PlannedTxnsAddRequest: 'PlannedTxnsAddRequest',
  PlannedTxnsFetchReceive: 'PlannedTxnsFetchReceive',
  PlannedTxnsFetchRequest: 'PlannedTxnsFetchRequest',
  PlannedTxnModalShow: 'PlannedTxnModalShow',
  TxnsFetchReceive: 'TxnsFetchReceive',
  TxnsFetchRequest: 'TxnsFetchRequest',
  TxnModalShow: 'TxnModalShow',
}

const AT = ActionTypes

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.PlannedTxnsAddRequest
    })

    client(getState()).post('/plannedTransactions', newPlannedTxn).then((plannedTxn) => {
      dispatch(fetchPlannedTxns(plannedTxn.accountGuid))
      dispatch({
        type: AT.PlannedTxnsAddReceive,
        plannedTxn
      })
    })
  }
}

export function addTxn(newTxn) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.AddTxnsRequest
    })

    client(getState()).post('/transactions', newTxn).then((txn) => {
      dispatch(fetchTxns(txn.accountGuid))
      dispatch({
        type: AT.AddTxnsReceive,
        txn
      })
    })
  }
}

export function editTxn(oldTxn, attrs) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.EditTxnRequest
    })

    client(getState()).post('/transactions/' + oldTxn.guid + '/adjustments', attrs).then((newTxn) => {
      dispatch(fetchTxns(oldTxn.accountGuid))
      dispatch({
        type: AT.EditTxnReceive,
        oldTxn,
        newTxn,
      })
    })
  }
}

export function deleteTxn(txn) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.DeleteTxnRequest
    })

    client(getState()).delete('/transactions/' + txn.guid).then(() => {
      dispatch(fetchTxns(txn.accountGuid))
      dispatch({
        type: AT.DeleteTxnReceive,
        txn
      })
    })
  }
}

export function fetchPlannedTxns(accountGuid, page = 1) {
  return function (dispatch, getState) {
    dispatch({ type: AT.PlannedTxnsFetchRequest })

    const url = '/plannedTransactions?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    client(getState()).get(url, true).then(response  => {
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
  return function (dispatch, getState) {
    dispatch({ type: AT.TxnsFetchRequest })

    const url = '/transactions?accountGuid=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    client(getState()).get(url, true).then( response => {
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
