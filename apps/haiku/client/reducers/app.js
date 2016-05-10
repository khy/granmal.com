import u from 'updeep'

const initialState = {
  alert: undefined,
  index: {
    haikus: {
      isPending: false,
      isInvalidated: true,
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
          isInvalidated: false,
          haikus: action.haikus,
        }}
      }, state)

    case 'CreateHaikuSuccess':
      return u({
        alert: { type: 'CreateHaikuSuccess', haiku: action.haiku },
        index: { haikus: { isInvalidated: true } },
      }, state)

    default:
      return state

  }

}
