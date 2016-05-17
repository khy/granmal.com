import u from 'updeep'

const initialState = {
  alert: undefined,
  index: {
    haikus: {
      isPending: false,
      isInvalidated: true,
      haikus: [],
    },
  },
  user: {
    handle: undefined,
    haikus: {
      isPending: false,
      isInvalidated: true,
      haikus: [],
    },
  },
  show: {
    isPending: false,
    haiku: undefined,
  },
}

export default function app(state = initialState, action) {

  switch (action.type) {

    case 'ClearShowHaiku':
      return u({
        show: { haiku: undefined }
      }, state)

    case 'FetchShowHaikuSend':
      return u({
        show: { isPending: true }
      }, state)

    case 'FetchShowHaikuSuccess':
      return u({ show: {
        isPending: false,
        haiku: u.constant(action.haiku),
      }}, state)

    case 'FetchIndexHaikusSend':
      return u({
        index: { haikus: { isPending: true } }
      }, state)

    case 'FetchIndexHaikusSuccess':
      return u({
        index: { haikus: {
          isPending: false,
          isInvalidated: false,
          haikus: u.constant(action.haikus),
        }}
      }, state)

    case 'FetchUserHaikusSend':
      return u({
        user: { haikus: { isPending: true } }
      }, state)

    case 'FetchUserHaikusSuccess':
      return u({
        user: { haikus: {
          isPending: false,
          isInvalidated: false,
          haikus: u.constant(action.haikus),
        }}
      }, state)

    case 'UpdateUser':
      return u({ user: {
        handle: action.handle,
        haikus: { isInvalidated: true, haikus: u.constant([]) },
      }}, state)

    case 'CreateHaikuSuccess':
      return u({
        alert: { type: 'CreateHaikuSuccess', haiku: action.haiku },
        index: { haikus: { isInvalidated: true } },
      }, state)

    default:
      return state

  }

}
