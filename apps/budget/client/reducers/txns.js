import u from 'updeep'

import { ActionTypes as AT } from '../actions/txns'

export const initialState = {}

export default function txns(state = initialState, action) {

  switch (action.type) {

    case AT.DeleteTxnReceive:
      return u({
        lastUserAction: {
          type: 'DeleteTxn',
          txn: action.txn,
        },
      }, state)

    case AT.EditTxnReceive:
      return u({
        lastUserAction: {
          type: 'EditTxn',
          oldTxn: action.oldTxn,
          newTxn: action.newTxn,
        },
      }, state)

    case AT.FetchTxnReceive:
      return u({
        show: {
          isFetching: false,
          txn: u.constant(action.txn),
        },
      }, state)

    case AT.FetchTxnRequest:
      return u({
        show: {
          isFetching: true
        },
      }, state)

    default:
      return state

  }

}
