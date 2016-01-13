import u from 'updeep'

import { ActionTypes as AT } from '../actions/account'

export const initialState = {
  plannedTxns: {
    isFetching: false,
    results: [],
  },
  txns: {
    isFetching: false,
    results: [],
  },
}

export default function account(state = initialState, action) {

  switch (action.type) {

    case AT.PlannedTxnsFetchReceive:
      return u({plannedTxns: {isFetching: false, results: action.plannedTxns}}, state)

    case AT.PlannedTxnsFetchRequest:
      return u({plannedTxns: {isFetching: true}}, state)

    case AT.TxnsFetchReceive:
      return u({txns: {isFetching: false, results: action.txns}}, state)

    case AT.TxnsFetchRequest:
      return u({txns: {isFetching: true}}, state)

    default:
      return state

  }

}
