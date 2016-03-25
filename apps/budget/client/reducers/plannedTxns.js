import u from 'updeep'

import { ActionTypes as AT } from '../actions/plannedTxns'

export const initialState = {
  results: [],
  isFetching: false,
}

export default function plannedTxns(state = initialState, action) {

  switch (action.type) {

    case AT.FetchPlannedTxnReceive:
      return u({
        show: {
          isFetching: false,
          plannedTxn: action.plannedTxn,
        },
      }, state)

    case AT.FetchPlannedTxnRequest:
      return u({
        show: {
          isFetching: true,
          plannedTxn: undefined,
        },
      }, state)

    case AT.FetchPlannedTxnTxnsReceive:
      return u({
        show: {
          txns: {
            isFetching: false,
            txns: action.txns,
          }
        },
      }, state)

    case AT.FetchPlannedTxnTxnsRequest:
      return u({
        show: {
          txns: {
            isFetching: true,
            txns: [],
          }
        },
      }, state)

    case AT.PlannedTxnsReceive:
      return u({ isFetching: false, results: action.results }, state)

    case AT.PlannedTxnsRequest:
      return u({ isFetching: true }, state)

    default:
      return state

  }

}
