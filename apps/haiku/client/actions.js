import _map from 'lodash/map'
import moment from 'moment'

import { hideModal, enableModal, disableModal, updateModal } from 'client/actions/modal'
import { haikuClient } from 'haiku/client/lib/clients'

export function fetchHaiku(guid) {
  return function (dispatch, getState) {
    const state = getState()
    const show = state.app.show

    if (!show.haiku || show.haiku.guid !== guid) {
      dispatch({ type: 'FetchShowHaikuSend' })

      haikuClient(state).get(`/haikus?guid=${guid}`).then((haikus) => {
        dispatch({ type: 'FetchShowHaikuSuccess', haiku: haikus[0] })
      })
    }
  }
}

export function fetchIndexHaikus() {
  return function (dispatch, getState) {
    const state = getState()
    const indexHaikus = state.app.index.haikus

    if (indexHaikus.isInvalidated && !indexHaikus.isPending) {
      dispatch({ type: 'FetchIndexHaikusSend' })

      haikuClient(state).get('/haikus').then((haikus) => {
        dispatch({ type: 'FetchIndexHaikusSuccess', haikus })
      })
    }
  }
}

export function fetchUserHaikus(handle) {
  return function (dispatch, getState) {
    const existingHandle = getState().app.user.handle

    if (handle !== existingHandle) {
      dispatch({ type: 'UpdateUser', handle })
    }

    const state = getState()
    const userHaikus = state.app.user.haikus

    if (userHaikus.isInvalidated && !userHaikus.isPending) {
      dispatch({ type: 'FetchUserHaikusSend' })

      haikuClient(state).get(`/haikus?user=${handle}`).then((haikus) => {
        dispatch({ type: 'FetchUserHaikusSuccess', haikus })
      })
    }
  }
}

export function submitNewHaikuModal(newHaiku) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    haikuClient(getState()).post('/haikus', newHaiku, true).then((response) => {
      if (response.ok) {
        response.json().then((haiku) => {
          dispatch({ type: 'CreateHaikuSuccess', haiku })
          dispatch(hideModal())
        })
      } else {
        response.json().then((errors) => {
          dispatch(updateModal({ errors }))
          dispatch(enableModal())
        })
      }
    })
  }
}
