import u from 'updeep'

import { ActionTypes as AT } from '../actions/contexts'

export default function txnTypes(state = {}, action) {

  switch (action.type) {

    case AT.AddContextUserRequest:
      return u({modal: {isPosting: true}}, state)

    case AT.AddContextUserReceive:
      return u({modal: undefined}, state)

    default:
      return state

  }

}
