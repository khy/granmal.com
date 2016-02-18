import _map from 'lodash/collection/map'

import client from 'budget/client/lib/client'
import { fetchTxnTypes } from 'budget/client/actions/app'

export const ActionTypes = {
  AddTxnTypeReceive: 'AddTxnTypeReceive',
  AddTxnTypeRequest: 'AddTxnTypeRequest',
  AdjustTxnTypeReceive: 'AdjustTxnTypeReceive',
  AdjustTxnTypeRequest: 'AdjustTxnTypeRequest',
  HideTxnTypeModal: 'HideTxnTypeModal',
  ShowAddTxnTypeModal: 'ShowAddTxnTypeModal',
  ShowAdjustTxnTypeModal: 'ShowAdjustTxnTypeModal'
}

const AT = ActionTypes

export function addTxnType(newTxnType) {
  return function (dispatch, getState) {
    dispatch({ type: AT.AddTxnTypeRequest })

    client(getState()).post('/transactionTypes', newTxnType).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AddTxnTypeReceive,
        name: txnType.name,
      })
    })
  }
}

export function adjustTxnType(guid, attributes) {
  return function (dispatch, getState) {
    dispatch({ type: AT.AdjustTxnTypeRequest })

    client(getState()).post('/transactionTypes/' + guid + '/adjustments', attributes).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AdjustTxnTypeReceive,
        txnType: txnType,
      })
    })
  }
}
