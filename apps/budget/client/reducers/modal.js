import u from 'updeep'

import { ActionTypes as AT } from '../actions/modal'

const initialState = {
  name: undefined,
  isVisible: false,
  isEnabled: true,
  data: {}
}

export default function modal(state = initialState, action) {

  switch (action.type) {

    case AT.DisableModal:
      return u({ isEnabled: false }, state)

    case AT.EnableModal:
      return u({ isEnabled: true }, state)

    case AT.HideModal:
      return u({ isVisible: false }, state)

    case AT.ShowModal:
      return u({
        name: action.name,
        isVisible: true,
        isEnabled: true,
        data: action.data,
      }, state)

    default:
      return state

  }

}
