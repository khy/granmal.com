import u from 'updeep'

const initialState = {
  alert: undefined,
  index: {
    haikus: {
      isPending: false,
      isInvalidated: true,
      haikus: [],
    }
  },
  user: {
    handle: undefined,
    haikus: {
      isPending: false,
      isInvalidated: true,
      haikus: [],
    }
  },
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
          isInvalidated: false,
          haikus: action.haikus,
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
          haikus: action.haikus,
        }}
      }, state)

    case 'UpdateUser':
      return u({ user: {
        handle: action.handle,
        haikus: { isInvalidated: true, haikus: [] },
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
