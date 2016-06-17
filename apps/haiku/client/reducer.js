import u from 'updeep'

const initialState = {
  alert: undefined,
  index: {
    haikus: {
      isPending: false,
      isInvalidated: true,
      isLastPage: false,
      haikus: [],
    },
  },
  user: {
    handle: undefined,
    haikus: {
      isPending: false,
      isInvalidated: true,
      isLastPage: false,
      haikus: [],
    },
  },
  show: {
    isPending: false,
    isInvalidated: true,
    haiku: undefined,
  },
}

function app(state = initialState, action) {

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
        isInvalidated: false,
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
          isLastPage: action.isLastPage,
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
          isLastPage: action.isLastPage,
          haikus: u.constant(action.haikus),
        }}
      }, state)

    case 'UpdateUser':
      return u({ user: {
        handle: action.handle,
        haikus: { isInvalidated: true, haikus: u.constant([]) },
      }}, state)

    case 'ReloadApp':
      return u({
        index: { haikus: { isInvalidated: true } },
        user: { haikus: { isInvalidated: true } },
        show: { isInvalidated: true },
      }, state)

    default:
      return state

  }

}

import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  app, auth, config, modal
})
