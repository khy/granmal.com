import u from 'updeep'

import { ActionTypes as AT } from '../actions/txnTypes'

export const initialState = {
  lastUserAction: undefined
}

export default function txnTypes(state = initialState, action) {

  switch (action.type) {

    case AT.AddTxnTypeReceive:
      return u({
        lastUserAction: {
          type: 'AddTxnType',
          txnType: action.txnType,
        },
      }, state)

    case AT.AdjustTxnTypeReceive:
      return u({
        lastUserAction: {
          type: 'AdjustTxnType',
          txnType: action.txnType,
        },
      }, state)

    default:
      return state

  }

}
