import { booksClient } from 'bookClub/client/clients'

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
