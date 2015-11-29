import u from 'updeep'

import { SetAccount } from 'client/actions/auth'

const initialState = {}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case SetAccount:
      return u({ account: action.account }, state)
    default:
      return state
  }
}
