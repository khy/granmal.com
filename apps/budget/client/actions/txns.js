import { budgetClient } from 'budget/client/lib/clients'

export const ActionTypes = {
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
