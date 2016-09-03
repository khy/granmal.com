import { browserHistory } from 'react-router'

import { showModal, hideModal } from 'client/actions/modal'

import { booksClient } from 'bookClub/client/clients'

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
        browserHistory.push(`/book-club/notes/${note.guid}`)
        dispatch(hideModal())
        dispatch({ type: 'notes.create.success', note })
      })
    })
  }
}

export function fetchEditionsForNewNote(title) {
  return function (dispatch, getState) {
    const state = getState()

    if (title && !state.app.newNote.editions.isPending) {
      dispatch({ type: 'newNote.editions.fetch.send' })

      booksClient(state).get(`/editions?title=${title}`).then((editions) => {
        dispatch({ type: 'newNote.editions.fetch.success', editions })
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

export function fetchBookForShowBook(guid) {
  return function (dispatch, getState) {
    const state = getState()
    const book = state.app.showBook.book

    if (book.isInvalidated && !book.isPending) {
      dispatch({ type: 'showBook.book.fetch.send' })

      booksClient(state).get(`/books?guid=${guid}`).then((books) => {
        dispatch({ type: 'showBook.book.fetch.success', book: books[0] })
      })
    }
  }
}

export function fetchNoteForShowNote(guid) {
  return function (dispatch, getState) {
    const state = getState()
    const note = state.app.showNote.note

    if (note.isInvalidated && !note.isPending) {
      dispatch({ type: 'showNote.fetch.send' })

      booksClient(state).get(`/notes?guid=${guid}`).then((notes) => {
        dispatch({ type: 'showNote.fetch.success', note: notes[0] })
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
