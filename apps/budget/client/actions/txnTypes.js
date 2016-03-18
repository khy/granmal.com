import _map from 'lodash/collection/map'

import { budgetClient } from 'budget/client/lib/clients'
import { fetchTxnTypes } from 'budget/client/actions/app'
import { hideModal, disableModal } from 'budget/client/actions/modal'

export const ActionTypes = {
  AddTxnTypeReceive: 'AddTxnTypeReceive',
  AdjustTxnTypeReceive: 'AdjustTxnTypeReceive',
  FetchTxnTypeTxnsReceive: 'FetchTxnTypeTxnsReceive',
  FetchTxnTypeTxnsRequest: 'FetchTxnTypeTxnsRequest',
}

const AT = ActionTypes

export function addTxnType(newTxnType) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/transactionTypes', newTxnType).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AddTxnTypeReceive,
        txnType,
      })
      dispatch(hideModal())
    })
  }
}

export function adjustTxnType(guid, attributes) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/transactionTypes/' + guid + '/adjustments', attributes).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AdjustTxnTypeReceive,
        txnType,
      })
      dispatch(hideModal())
    })
  }
}

export function fetchTxnTypeTxns(guid) {
  return function (dispatch, getState) {
    dispatch({type: AT.FetchTxnTypeTxnsRequest})

    budgetClient(getState()).get(`/transactions?transactionType=${guid}`).then((txns) => {
      dispatch({
        type: AT.FetchTxnTypeTxnsReceive,
        txns,
      })
    })
  }
}
