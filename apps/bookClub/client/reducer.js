import { combineReducers } from 'redux'
import u from 'updeep'

import alert from 'client/reducers/alert'
import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = {
  newNote: {
    isPending: false,
    editions: {
      isPending: false,
      records: [],
    },
  },
  index: {
    books: {
      isPending: false,
      isInvalidated: true,
      records: [],
    },
  },
  showBook: {
    book: {
      isPending: false,
      isInvalidated: true,
      record: undefined,
    },
  },
  showNote: {
    note: {
      isPending: false,
      isInvalidated: true,
      record: undefined,
    }
  },
}

function app(state = initialState, action) {

  switch (action.type) {

    case 'index.books.fetch.send':
      return u({
        index: { books: { isPending: true } }
      }, state)

    case 'index.books.fetch.success':
      return u({ index: { books: {
        isPending: false,
        isInvalidated: false,
        records: action.books,
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

    case 'newNote.editions.fetch.send':
      return u({
        newNote: { editions: { isPending: true } }
      }, state)

    case 'newNote.editions.fetch.success':
      return u({ newNote: { editions: {
        isPending: false,
        records: action.editions,
      }}}, state)

    case 'showBook.book.fetch.send':
      return u({
        showBook: { book: { isPending: true } }
      }, state)

    case 'showBook.book.fetch.success':
      return u({ showBook: { book: {
        isPending: false,
        isInvalidated: false,
        record: action.book,
      }}}, state)

    case 'showBook.book.clear':
      return u({ showBook: { book: {
        isInvalidated: true,
        record: undefined,
      }}}, state)

    case 'showNote.fetch.send':
      return u({
        showNote: { note: { isPending: true } }
      }, state)

    case 'showNote.fetch.success':
      return u({ showNote: { note: {
        isPending: false,
        isInvalidated: false,
        record: action.note,
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
