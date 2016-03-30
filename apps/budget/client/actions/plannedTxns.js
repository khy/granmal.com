import _map from 'lodash/collection/map'

import { budgetClient } from 'budget/client/lib/clients'
import { hideModal, disableModal } from 'budget/client/actions/modal'

export const ActionTypes = {
  FetchPlannedTxnReceive: 'FetchPlannedTxnReceive',
  FetchPlannedTxnRequest: 'FetchPlannedTxnRequest',
  FetchPlannedTxnTxnsReceive: 'FetchPlannedTxnTxnsReceive',
  FetchPlannedTxnTxnsRequest: 'FetchPlannedTxnTxnsRequest',
  PlannedTxnsReceive: 'PlannedTxnsReceive',
  PlannedTxnsRequest: 'PlannedTxnsRequest',
}

const AT = ActionTypes

export function addPlannedTxnTxn(plannedTxnGuid, newTxn) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/transactions', newTxn).then((txn) => {
      dispatch(fetchPlannedTxnTxns(plannedTxnGuid))
      dispatch(hideModal())
    })
  }
}

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

export function fetchPlannedTxnTxns(guid) {
  return function (dispatch, getState) {
    dispatch({type: AT.FetchPlannedTxnTxnsRequest})

    budgetClient(getState()).get(`/transactions?plannedTransaction=${guid}`).then((txns) => {
      dispatch({
        type: AT.FetchPlannedTxnTxnsReceive,
        txns: txns,
      })
    })
  }
}
