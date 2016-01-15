import u from 'updeep'

import { ActionTypes as AT } from '../actions/account'

export const initialState = {
  plannedTxns: {
    isFetching: false,
    results: [],
  },
  plannedTxnModal: {
    isPosting: false,
  },
  txns: {
    isFetching: false,
    results: [],
  },
}

export default function account(state = initialState, action) {

  switch (action.type) {

    case AT.HideModal:
      return u({currentModal: undefined}, state)

    case AT.PlannedTxnsFetchReceive:
      return u({plannedTxns: {
        isFetching: false,
        results: action.plannedTxns,
        linkHeader: action.linkHeader,
      }}, state)

    case AT.PlannedTxnsFetchRequest:
      return u({plannedTxns: {isFetching: true}}, state)

    case AT.PlannedTxnModalShow:
      return u({currentModal: 'plannedTxnModal'}, state)

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
