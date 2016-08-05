import { browserHistory } from 'react-router'

import { showModal, hideModal } from 'client/actions/modal'

import { booksClient } from 'bookClub/client/clients'

export function createBookForNewNote(newBook) {
  return function (dispatch, getState) {
    dispatch({ type: 'newNote.books.create.send' })

    const state = getState()

    let authorPromise

    if (newBook.authorGuid) {
      const author = state.app.newBook.authors.records.find((author) => {
        return author.guid === newBook.authorGuid
      })

      authorPromise = Promise.resolve(author)
    } else {
      authorPromise = booksClient(state).post('/authors', {
        name: newBook.authorName,
      })
    }

    authorPromise.then((author) => {
      booksClient(state).post('/books', {
        authorGuid: author.guid,
        title: newBook.title,
      }).then((book) => {
        dispatch({ type: 'newNote.books.create.success', book })
      })
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
        browserHistory.push(`/book-club/notes/${note.guid}`)
        dispatch(hideModal())
        dispatch({ type: 'notes.create.success', note })
      })
    })
  }
}

export function fetchAuthorsForNewBook(name) {
  return function (dispatch, getState) {
    const state = getState()

    if (name && !state.app.newBook.authors.isPending) {
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

    if (title && !state.app.newNote.books.isPending) {
      dispatch({ type: 'newNote.books.fetch.send' })

      booksClient(state).get(`/books?title=${title}`).then((books) => {
        dispatch({ type: 'newNote.books.fetch.success', books })
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
