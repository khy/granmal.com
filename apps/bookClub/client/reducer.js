import { combineReducers } from 'redux'
import u from 'updeep'

import alert from 'client/reducers/alert'
import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = {
  books: {
    isPending: false,
    isInvalidated: true,
    records: []
  },
  newBook: {
    authors: {
      isPending: false,
      records: [],
    },
    books: {
      isPending: false,
      records: [],
    },
  },
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

    case 'books.fetch.send':
      return u({
        books: { isPending: true }
      }, state)

    case 'books.fetch.success':
      return u({ books: {
        isPending: false,
        isInvalidated: false,
        records: action.books,
      }}, state)

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

    case 'newBookAuthors.fetch.send':
      return u({
        newBook: { authors: { isPending: true } }
      }, state)

    case 'newBookAuthors.fetch.success':
      return u({ newBook: { authors: {
        isPending: false,
        records: action.authors,
      }}}, state)

    default:
      return state

  }

}

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  alert, app, auth, config, modal
})
