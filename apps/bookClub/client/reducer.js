import { combineReducers } from 'redux'
import u from 'updeep'

import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = {
  index: {
    main: {
      isPending: false,
      isInvalidated: true,
      isLastPage: false,
      notes: [],
    },
  },
}

function app(state = initialState, action) {

  switch (action.type) {

    case 'indexMain.fetch.send':
      return u({
        index: { main: { isPending: true } }
      }, state)

    case 'indexMain.fetch.success':
      return u({ index: { main: {
        isPending: false,
        isInvalidated: false,
        notes: action.notes,
      }}}, state)

    default:
      return state

  }

}

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  app, auth, config, modal
})
