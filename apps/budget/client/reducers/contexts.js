import u from 'updeep'

import { ActionTypes as AT } from '../actions/contexts'

const initialState = {
  lastUserAction: undefined
}

export default function contexts(state = initialState, action) {

  switch (action.type) {

    case AT.AddContextUserReceive:
      return u({
        lastUserAction: {
          type: 'AddContextUser',
          contextName: action.contextName,
          userName: action.userName,
        },
      }, state)

    default:
      return state

  }

}
