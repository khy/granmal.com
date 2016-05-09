import { browserHistory } from 'react-router'

import { budgetClient } from 'budget/client/lib/clients'
import { hideModal, disableModal } from 'client/actions/modal'

export const ActionTypes = {
  DeleteTxnReceive: 'DeleteTxnReceive',
  EditTxnReceive: 'EditTxnReceive',
  FetchTxnReceive: 'FetchTxnReceive',
  FetchTxnRequest: 'FetchTxnRequest',
}

const AT = ActionTypes

export function fetchTxn(guid) {
  return function (dispatch, getState) {
    dispatch({type: AT.FetchTxnRequest})

    budgetClient(getState()).get(`/transactions?guid=${guid}`).then((txns) => {
      dispatch({
        type: AT.FetchTxnReceive,
        txn: txns[0],
      })
    })
  }
}

export function editTxn(oldTxn, attrs) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/transactions/' + oldTxn.guid + '/adjustments', attrs).then((newTxn) => {
      browserHistory.push(`/budget/transactions/${newTxn.guid}`)
      dispatch({
        type: AT.EditTxnReceive,
        oldTxn,
        newTxn,
      })
      dispatch(hideModal())
    })
  }
}

export function deleteTxn(txn) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).delete('/transactions/' + txn.guid).then(() => {
      browserHistory.push(`/budget/accounts/${txn.accountGuid}`)
      dispatch({
        type: AT.DeleteTxnReceive,
        txn
      })
      dispatch(hideModal())
    })
  }
}
