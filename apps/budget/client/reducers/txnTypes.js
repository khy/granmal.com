import u from 'updeep'

import { ActionTypes as AT } from '../actions/txnTypes'

export const initialState = {
  modal: undefined
}

export const ModalTypes = {
  AddTxnType: 'AddTxnType',
  AdjustTxnType: 'AdjustTxnType'
}

export default function txnTypes(state = initialState, action) {

  switch (action.type) {

    case AT.AddTxnTypeRequest:
    case AT.AdjustTxnTypeRequest:
      return u({modal: {isPosting: true}}, state)

    case AT.AddTxnTypeReceive:
    case AT.AdjustTxnTypeReceive:
    case AT.HideTxnTypeModal:
      return u({modal: undefined}, state)

    case AT.ShowAddTxnTypeModal:
      return u({modal: {type: ModalTypes.AddTxnType, parentGuid: action.parentGuid}}, state)

    case AT.ShowAdjustTxnTypeModal:
      return u({modal: {type: ModalTypes.AdjustTxnType, guid: action.guid}}, state)

    default:
      return state

  }

}
