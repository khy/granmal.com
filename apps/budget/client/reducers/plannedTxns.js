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
          isFetching: true
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
