import u from 'updeep'

import { ActionTypes as AT } from '../actions/txnTypes'

export const initialState = {
  lastUserAction: undefined,
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

    case AT.FetchTxnTypePlannedTxnsRequest:
      return u({
        show: {
          plannedTxns: {
            isFetching: true,
          },
        },
      }, state)

    case AT.FetchTxnTypePlannedTxnsReceive:
      return u({
        show: {
          plannedTxns: {
            isFetching: false,
            records: action.plannedTxns,
          },
        },
      }, state)

    case AT.FetchTxnTypeTxnsRequest:
      return u({
        show: {
          txns: {
            isFetching: true,
          },
        },
      }, state)

    case AT.FetchTxnTypeTxnsReceive:
      return u({
        show: {
          txns: {
            isFetching: false,
            records: action.txns,
          },
        },
      }, state)

    default:
      return state

  }

}
