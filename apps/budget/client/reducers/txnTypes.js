import u from 'updeep'

import { ActionTypes as AT } from '../actions/txnTypes'

export const initialState = {
  modalParentGuid: undefined,
  modalIsPosting: false,
}

export default function txnTypes(state = initialState, action) {

  switch (action.type) {

    case AT.AddTxnTypeRequest:
      return u({modalIsPosting: true}, state)

    case AT.AddTxnTypeReceive:
      return u({modalIsPosting: false, modalParentGuid: undefined}, state)

    case AT.HideTxnTypeModal:
      return u({modalParentGuid: undefined}, state)

    case AT.ShowTxnTypeModal:
      return u({modalParentGuid: action.parentGuid}, state)

    default:
      return state

  }

}
