import { browserHistory } from 'react-router'

import { uselessResourceOwnerId } from 'common/account'
import { showModal, hideModal } from 'client/actions/modal'
import { showAdHocAlert, showNamedAlert } from 'client/actions/alert'
import { AlertContext } from 'client/components/bootstrap/alert'

import { booksClient } from 'dogEars/client/clients'

export function createDogEar(newDogEar) {
  return function (dispatch, getState) {
    dispatch({ type: 'newDogEar.create.send' })

    booksClient(getState()).post('/dogEars', {
      isbn: newDogEar.isbn,
      pageNumber: newDogEar.pageNumber,
      note: newDogEar.note,
    }).then((dogEar) => {
      dispatch({ type: 'newDogEar.create.success', dogEar })
      dispatch(hideModal())
      dispatch(showNamedAlert('dogEarAdded', { dogEar }))

      if (dogEar.note) {
        browserHistory.push(`/dogEars/notes/${dogEar.guid}`)
      }
    })
  }
}

export function fetchEditionsForNewDogEar(title) {
  return function (dispatch, getState) {
    const state = getState()

    if (title && !state.app.newDogEar.editions.isPending) {
      dispatch({ type: 'newDogEar.editions.fetch.send' })

      booksClient(state).get(`/editions?title=${title}`).then((editions) => {
        dispatch({ type: 'newDogEar.editions.fetch.success', editions })
      })
    }
  }
}

export function fetchBooksForIndex() {
  return function (dispatch, getState) {
    const state = getState()
    const books = state.app.index.books

    if (books.isInvalidated && !books.isPending) {
      dispatch({ type: 'index.books.fetch.send' })

      booksClient(state).get(`/books?p.limit=20`).then((books) => {
        dispatch({ type: 'index.books.fetch.success', books })
      })
    }
  }
}

export function fetchDogEarsForIndex() {
  return function (dispatch, getState) {
    const state = getState()
    const dogEars = state.app.index.dogEars

    if (dogEars.isInvalidated && !dogEars.isPending) {
      dispatch({ type: 'index.dogEars.fetch.send' })

      booksClient(state).get(`/dogEars?p.limit=20`).then((dogEars) => {
        dispatch({ type: 'index.dogEars.fetch.success', dogEars })
      })
    }
  }
}

export function fetchBookForShowBook(title) {
  return function (dispatch, getState) {
    const state = getState()
    const book = state.app.showBook.book

    if (book.isInvalidated && !book.isPending) {
      dispatch({ type: 'showBook.book.fetch.send' })

      booksClient(state).get(`/books?title=${title}`).then((books) => {
        dispatch({ type: 'showBook.book.fetch.success', book: books[0] })
      })
    }
  }
}

export function fetchDogEarsForShowBook(title) {
  return function (dispatch, getState) {
    const state = getState()
    const dogEars = state.app.showBook.dogEars

    if (dogEars.isInvalidated && !dogEars.isPending) {
      dispatch({ type: 'showBook.dogEars.fetch.send' })

      booksClient(state).get(`/dogEars?bookTitle=${title}`).then((dogEars) => {
        dispatch({ type: 'showBook.dogEars.fetch.success', dogEars })
      })
    }
  }
}

export function fetchDogEarForShowNote(guid) {
  return function (dispatch, getState) {
    const state = getState()
    const dogEar = state.app.showNote.dogEar

    if (dogEar.isInvalidated && !dogEar.isPending) {
      dispatch({ type: 'showNote.dogEar.fetch.send' })

      booksClient(state).get(`/dogEars?guid=${guid}`).then((dogEars) => {
        dispatch({ type: 'showNote.dogEar.fetch.success', dogEar: dogEars[0] })
      })
    }
  }
}

function fetchRecentEditionsThunk(dispatch, getState) {
  const state = getState()
  const recentEditions = state.app.recentEditions

  if (recentEditions.isInvalidated && !recentEditions.isPending) {
    dispatch({ type: 'recentEditions.fetch.send' })

    const accountGuid = uselessResourceOwnerId(state.auth.account)
    const url = `/userEditions?userGuid=${accountGuid}`
    return booksClient(state).get(url).then((userEditions) => {
      dispatch({
        type: 'recentEditions.fetch.success',
        editions: userEditions.map((ue) => ue.edition)
      })
    })
  } else {
    return Promise.resolve()
  }
}

export function initializeApp() {
  return function (dispatch, getState) {
    Promise.all([
      fetchRecentEditionsThunk(dispatch, getState)
    ]).then(() => {
      dispatch({ type: 'initialization.fetch.success'})
    })
  }
}

export function showNewDogEarModal() {
  return function (dispatch, getState) {
    const state = getState()

    if (state.auth.account) {
      dispatch(showModal('NewDogEar', {}))
    } else {
      dispatch(showModal('LogIn', {
        message: 'You must log in to add a dog ear'
      }))
    }
  }
}
