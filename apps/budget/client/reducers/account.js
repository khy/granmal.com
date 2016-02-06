import u from 'updeep'

import { ActionTypes as AT } from '../actions/account'

export const initialState = {
  editTxnModal: {
    isPosting: false
  },
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

    case AT.EditTxnModalShow:
      return u({
        activeModal: 'editTxnModal',
        editTxnModal: {txn: action.txn},
      }, state)

    case AT.EditTxnReceive:
      return u({
        activeModal: undefined,
        editTxnModal: {
          txn: undefined,
          isPosting: false
        }
      }, state)

    case AT.EditTxnRequest:
      return u({editTxnModal: {isPosting: true}}, state)

    case AT.DeleteTxnReceive:
      return u({
        activeModal: undefined,
        editTxnModal: {
          txn: undefined,
          isPosting: false
        }
      }, state)

    case AT.DeleteTxnRequest:
      return u({editTxnModal: {isPosting: true}}, state)

    case AT.PlannedTxnsAddReceive:
      return u({
        activeModal: undefined,
        lastUserAction: {
          type: 'AddPlannedTxn',
          plannedTxn: action.plannedTxn,
        },
        plannedTxnModal: {isPosting: false}
      }, state)

    case AT.PlannedTxnsAddRequest:
      return u({plannedTxnModal: {isPosting: true}}, state)

    case AT.HideModal:
      return u({activeModal: undefined}, state)

    case AT.PlannedTxnsFetchReceive:
      return u({plannedTxns: {
        isFetching: false,
        results: action.plannedTxns,
        linkHeader: action.linkHeader,
      }}, state)

    case AT.PlannedTxnsFetchRequest:
      return u({plannedTxns: {isFetching: true}}, state)

    case AT.PlannedTxnModalShow:
      return u({activeModal: 'plannedTxnModal'}, state)

    case AT.TxnsAddReceive:
      return u({
        activeModal: undefined,
        lastUserAction: {
          type: 'AddTxn',
          txn: action.txn,
        },
        txnModal: {isPosting: false}
      }, state)

    case AT.TxnsAddRequest:
      return u({txnModal: {isPosting: true}}, state)

    case AT.TxnsFetchReceive:
      return u({txns: {
        isFetching: false,
        results: action.txns,
        linkHeader: action.linkHeader
      }}, state)

    case AT.TxnsFetchRequest:
      return u({txns: {isFetching: true}}, state)

    case AT.TxnModalShow:
      return u({activeModal: 'txnModal'}, state)

    default:
      return state

  }

}
