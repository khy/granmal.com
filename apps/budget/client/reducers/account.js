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

    case AT.AddTxnsReceive:
      return u({
        lastUserAction: {
          type: 'AddTxn',
          txn: action.txn,
        },
      }, state)

    case AT.DeleteTxnReceive:
      return u({
        lastUserAction: {
          type: 'DeleteTxn',
          txn: action.txn,
        },
      }, state)

    case AT.PlannedTxnsAddReceive:
      return u({
        lastUserAction: {
          type: 'AddPlannedTxn',
          plannedTxn: action.plannedTxn,
        },
      }, state)

    case AT.PlannedTxnsFetchReceive:
      return u({plannedTxns: {
        isFetching: false,
        results: action.plannedTxns,
        linkHeader: action.linkHeader,
      }}, state)

    case AT.PlannedTxnsFetchRequest:
      return u({plannedTxns: {isFetching: true}}, state)

    case AT.TxnsFetchReceive:
      return u({txns: {
        isFetching: false,
        results: action.txns,
        linkHeader: action.linkHeader
      }}, state)

    case AT.TxnsFetchRequest:
      return u({txns: {isFetching: true}}, state)

    default:
      return state

  }

}
