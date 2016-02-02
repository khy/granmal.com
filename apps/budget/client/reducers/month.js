import u from 'updeep'

import { ActionTypes as AT } from '../actions/month'

export default function plannedTxns(state = {}, action) {

  switch (action.type) {

    case AT.TxnTypeRollupReceive:
      return u({rollups: {
        isFetching: false,
        rollups: action.rollups
      }}, state)

    case AT.TxnTypeRollupRequest:
      return u({ rollups: {
        month: action.month,
        isFetching: true
      }}, state)

    default:
      return state

  }

}
