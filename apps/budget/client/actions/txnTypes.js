import _map from 'lodash/collection/map'

import { budgetClient as client } from 'budget/client/lib/clients'
import { fetchTxnTypes } from 'budget/client/actions/app'
import { hideModal, disableModal } from 'budget/client/actions/modal'

export const ActionTypes = {
  AddTxnTypeReceive: 'AddTxnTypeReceive',
  AdjustTxnTypeReceive: 'AdjustTxnTypeReceive',
}

const AT = ActionTypes

export function addTxnType(newTxnType) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    client(getState()).post('/transactionTypes', newTxnType).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AddTxnTypeReceive,
        txnType: txnType,
      })
      dispatch(hideModal())
    })
  }
}

export function adjustTxnType(guid, attributes) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    client(getState()).post('/transactionTypes/' + guid + '/adjustments', attributes).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AdjustTxnTypeReceive,
        txnType: txnType,
      })
      dispatch(hideModal())
    })
  }
}
