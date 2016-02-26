import u from 'updeep'

import { ActionTypes as AT } from '../actions/contexts'

const initialState = {
  modal: undefined
}

export default function contexts(state = initialState, action) {

  switch (action.type) {

    case AT.AddContextUserRequest:
      return u({modal: {isPosting: true}}, state)

    case AT.AddContextUserReceive:
    case AT.HideContextModal:
      return u({modal: undefined}, state)

    case AT.ShowAddContextUserModal:
      return u({modal: {type: 'addContextUser', contextGuid: action.contextGuid}}, state)

    default:
      return state

  }

}
