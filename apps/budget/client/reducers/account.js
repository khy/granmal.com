import u from 'updeep'

import { ActionTypes as AT } from '../actions/account'

export const initialState = {
  txns: {
    isFetching: false,
    results: [],
  },
  plannedTxns: {
    isFetching: false,
    results: [],
  },
}

export default function account(state = initialState, action) {

  switch (action.type) {

    case AT.FetchTxnsReceive:
      return u({txns: {isFetching: false, results: action.txns}}, state)

    case AT.FetchTxnsRequest:
      return u({txns: {isFetching: true}}, state)

    case AT.PlannedTxnsFetchReceive:
      return u({plannedTxns: {isFetching: false, results: action.plannedTxns}}, state)

    case AT.PlannedTxnsFetchRequest:
      return u({plannedTxns: {isFetching: true}}, state)

    default:
      return state

  }

}
