import _map from 'lodash/map'
import moment from 'moment'

import { hideModal, disableModal } from 'client/actions/modal'
import { haikuClient } from 'haiku/client/lib/clients'

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

export function submitNewHaikuModal(newHaiku) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    haikuClient(getState()).post('/haikus', newHaiku).then((haiku) => {
      dispatch({ type: 'CreateHaikuSuccess', haiku })
      dispatch(hideModal())
    })
  }
}
