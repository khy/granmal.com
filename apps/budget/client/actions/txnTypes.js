import _map from 'lodash/collection/map'

import { postJson } from 'budget/client/lib/client'
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
  return function (dispatch) {
    dispatch({ type: AT.AddTxnTypeRequest })

    postJson('/budget/api/txnTypes', newTxnType).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AddTxnTypeReceive,
        name: txnType.name,
      })
    })
  }
}

export function adjustTxnType(guid, attributes) {
  return function (dispatch) {
    dispatch({ type: AT.AdjustTxnTypeRequest })

    postJson('/budget/api/txnTypes/' + guid + '/adjustments', attributes).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AdjustTxnTypeReceive,
        txnType: txnType,
      })
    })
  }
}
