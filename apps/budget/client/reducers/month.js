import u from 'updeep'

import { ActionTypes as AT } from '../actions/month'

export default function plannedTxns(state = {}, action) {

  switch (action.type) {

    case AT.MonthTxnTypeRollupReceive:
      return u({rollups: {
        isFetching: false,
        rollups: action.rollups
      }}, state)

    case AT.MonthTxnTypeRollupRequest:
      return u({rollups: {
        month: action.month,
        isFetching: true
      }}, state)

    default:
      return state

  }

}
