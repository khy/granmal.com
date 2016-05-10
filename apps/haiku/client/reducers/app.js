import u from 'updeep'

import { ActionTypes as AT } from '../actions/account'

export const initialState = {
  alert: undefined
  index: {
    haikus: {
      isPending: false,
      isInvalidated: false,
      haikus: [],
    }
  }
}

export default function app(state = initialState, action) {

  switch (action.type) {

    case 'FetchIndexHaikusSend':
      return u({
        index: { haikus: { isPending: true } }
      }, state)

    case 'FetchIndexHaikusSuccess':
      return u({
        index: { haikus: {
          isPending: false,
          haikus: action.haikus
        }}
      }, state)

    case 'CreateHaikuSuccess':
      return u({
        alert: { type: 'CreateHaikuSuccess', haiku: action.haiku }
      }, state)

    default:
      return state

  }

}
