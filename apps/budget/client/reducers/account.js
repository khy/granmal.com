import u from 'updeep'

import { ActionTypes as AT } from '../actions/account'

export const initialState = {
  txns: {
    isFetching: false,
    results: []
  },
}

export default function account(state = initialState, action) {

  switch (action.type) {

    case AT.FetchTxnsReceive:
      return u({txns: {isFetching: false, results: action.txns}}, state)

    case AT.FetchTxnsRequest:
      return u({txns: {isFetching: true}}, state)

    default:
      return state

  }

}
