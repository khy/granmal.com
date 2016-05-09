import u from 'updeep'

import { DisableModal, EnableModal, HideModal, ShowModal } from 'client/actions/modal'

const initialState = {
  name: undefined,
  isVisible: false,
  isEnabled: true,
  data: {}
}

export default function modal(state = initialState, action) {

  switch (action.type) {

    case DisableModal:
      return u({ isEnabled: false }, state)

    case EnableModal:
      return u({ isEnabled: true }, state)

    case HideModal:
      return u({ isVisible: false }, state)

    case ShowModal:
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
