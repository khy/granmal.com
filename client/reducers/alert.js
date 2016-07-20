import u from 'updeep'

import { HideAlert, ShowNamedAlert, ShowAdHocAlert } from 'client/actions/alert'

const initialState = {
  isVisible: false,
  name: undefined,
  data: {},
  context: 'success',
  text: undefined,
}

export default function modal(state = initialState, action) {

  switch (action.type) {

    case HideAlert:
      return u({ isVisible: false }, state)

    case ShowNamedAlert:
      return u({
        isVisible: true,
        name: action.name,
        data: action.data,
      }, state)

    case ShowAdHocAlert:
      return u({
        isVisible: true,
        name: undefined,
        context: action.context,
        text: action.text,
      }, state)

    default:
      return state

  }

}
