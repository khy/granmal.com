import { showModal } from 'client/actions/modal'

import { booksClient } from 'bookClub/client/clients'

export function createBook(newBook) {
  return function (dispatch, getState) {
    dispatch({ type: 'books.create.send' })

    const state = getState()

    const author = state.app.newBook.authors.records.find((author) => {
      return author.guid === newBook.authorGuid
    })

    booksClient(state).post('/books', {
      authorGuid: author.guid,
      title: newBook.title,
    }).then((author) => {
      dispatch({ type: 'books.create.success', author })
    })
  }
}

export function createNote(newNote) {
  return function (dispatch, getState) {
    dispatch({ type: 'notes.create.send' })

    const state = getState()

    const book = state.app.newNote.books.records.find((book) => {
      return book.guid === newNote.bookGuid
    })

    const edition = book.editions.find((edition) => {
      return edition.pageCount === newNote.pageCount
    })

    let editionPromise

    if (edition) {
      editionPromise = Promise.resolve(edition)
    } else {
      editionPromise = booksClient(state).post('/editions', {
        bookGuid: newNote.bookGuid,
        pageCount: newNote.pageCount,
      })
    }

    editionPromise.then((edition) => {
      booksClient(state).post('/notes', {
        editionGuid: edition.guid,
        pageNumber: newNote.pageNumber,
        content: newNote.content,
      }).then((note) => {
        dispatch({ type: 'notes.create.success', note })
      })
    })
  }
}

export function fetchAuthorsForNewBook(name) {
  return function (dispatch, getState) {
    const state = getState()

    if (!state.app.newBook.authors.isPending) {
      dispatch({ type: 'newBook.authors.fetch.send' })

      booksClient(state).get(`/authors?name=${name}`).then((authors) => {
        dispatch({ type: 'newBook.authors.fetch.success', authors })
      })
    }
  }
}

export function fetchBooksForNewNote(title) {
  return function (dispatch, getState) {
    const state = getState()

    if (!state.app.newNote.books.isPending) {
      dispatch({ type: 'newNote.books.fetch.send' })

      booksClient(state).get(`/books?title=${title}`).then((books) => {
        dispatch({ type: 'newNote.books.fetch.success', books })
      })
    }
  }
}

export function fetchIndexMain() {
  return function (dispatch, getState) {
    const state = getState()
    const indexMain = state.app.index.main

    if (indexMain.isInvalidated && !indexMain.isPending) {
      dispatch({ type: 'indexMain.fetch.send' })

      booksClient(state).get(`/notes?p.limit=20`).then((notes) => {
        dispatch({ type: 'indexMain.fetch.success', notes })
      })
    }
  }
}

export function showNewNoteModal() {
  return function (dispatch, getState) {
    const state = getState()

    if (state.auth.account) {
      dispatch(showModal('NewNote', {}))
    } else {
      dispatch(showModal('LogIn', {
        message: 'You must log in to add a note'
      }))
    }
  }
}
