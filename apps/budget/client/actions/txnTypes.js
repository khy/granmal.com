import _map from 'lodash/collection/map'

import { postJson } from 'budget/client/lib/client'
import { fetchTxnTypes } from 'budget/client/actions/app'

export const ActionTypes = {
  AddTxnTypeReceive: 'AddTxnTypeReceive',
  AddTxnTypeRequest: 'AddTxnTypeRequest',
  HideTxnTypeModal: 'HideTxnTypeModal',
  ShowTxnTypeModal: 'ShowTxnTypeModal',
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
