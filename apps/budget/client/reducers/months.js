import u from 'updeep'

import { ActionTypes as AT } from '../actions/months'

const initialState = {
  index: {
    isFetching: false,
    rollups: [],
  },
  show: {
    month: undefined,
    txnTypeRollups: {
      isFetching: false,
      rollups: [],
    }
  },
}

export default function months(state = initialState, action) {

  switch (action.type) {

    case AT.MonthRollupsReceive:
      return u({ index: {
        isFetching: false,
        rollups: action.rollups
      }}, state)

    case AT.MonthRollupRequest:
      return u({ index: {
        isFetching: true
      }}, state)

    case AT.MonthTxnTypeRollupReceive:
      return u({show: { txnTypeRollups: {
        isFetching: false,
        rollups: action.rollups
      }}}, state)

    case AT.MonthTxnTypeRollupRequest:
      return u({show: {
        month: action.month,
        txnTypeRollups: {
          isFetching: true,
        },
      }}, state)

    default:
      return state

  }

}
