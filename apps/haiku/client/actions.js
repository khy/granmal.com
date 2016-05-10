import _map from 'lodash/map'
import moment from 'moment'

import { hideModal, disableModal } from 'client/actions/modal'
import { haikuClient } from 'haiku/client/lib/clients'

export function fetchIndexHaikus() {
  return function (dispatch, getState) {
    dispatch({ type: 'FetchIndexHaikusSend' })

    haikuClient(getState()).get('/haikus').then((haikus) => {
      dispatch({ type: 'FetchIndexHaikusSuccess', haikus })
    })
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
