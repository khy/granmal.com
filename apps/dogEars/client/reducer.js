import { combineReducers } from 'redux'
import u from 'updeep'

import alert from 'client/reducers/alert'
import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = {
  newDogEar: {
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
    dogEars: {
      isPending: false,
      isInvalidated: true,
      records: [],
    },
  },
  showDogEar: {
    dogEar: {
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

    case 'newDogEar.editions.fetch.send':
      return u({
        newDogEar: { editions: { isPending: true } }
      }, state)

    case 'newDogEar.editions.fetch.success':
      return u({ newDogEar: { editions: {
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

    case 'showBook.clear':
      return u({ showBook: {
        book: {
          isInvalidated: true,
          record: undefined,
        },
        dogEars: {
          isInvalidated: true,
          records: [],
        },
      }}, state)

    case 'showBook.dogEars.fetch.send':
      return u({
        showBook: { dogEars: { isPending: true } }
      }, state)

    case 'showBook.dogEars.fetch.success':
      return u({ showBook: { dogEars: {
        isPending: false,
        isInvalidated: false,
        records: action.dogEars,
      }}}, state)

    case 'showDogEar.fetch.send':
      return u({
        showDogEar: { dogEar: { isPending: true } }
      }, state)

    case 'showDogEar.fetch.success':
      return u({ showDogEar: { dogEar: {
        isPending: false,
        isInvalidated: false,
        record: action.dogEar,
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