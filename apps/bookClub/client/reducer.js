import { combineReducers } from 'redux'
import u from 'updeep'

import alert from 'client/reducers/alert'
import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = {
  newBook: {
    isPending: false,
    authors: {
      isPending: false,
      records: [],
    },
  },
  newNote: {
    isPending: false,
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

    case 'newBook.authors.fetch.send':
      return u({
        newBook: { authors: { isPending: true } }
      }, state)

    case 'newBook.authors.fetch.success':
      return u({ newBook: { authors: {
        isPending: false,
        records: action.authors,
      }}}, state)

    case 'newNote.books.create.send':
      return u({
        newBook: { isPending: true }
      }, state)

    case 'newNote.books.create.success':
      return u({
        newBook: { isPending: false },
        newNote: {
          selectedBook: action.book,
          books: {
            isPending: false,
            records: [action.book],
          }
        }
      }, state)

    case 'newNote.books.fetch.send':
      return u({
        newNote: { books: { isPending: true } }
      }, state)

    case 'newNote.books.fetch.success':
      return u({ newNote: { books: {
        isPending: false,
        records: action.books,
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
