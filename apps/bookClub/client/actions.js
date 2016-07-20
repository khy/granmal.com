import { showModal } from 'client/actions/modal'

import { booksClient } from 'bookClub/client/clients'

export function createNote(newNote) {
  console.log('createNote')
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
