import es6Promise from 'es6-promise'
import _map from 'lodash/map'
import moment from 'moment'
import u from 'updeep'

import { uselessResourceOwnerId } from 'common/account'
import { hideModal, enableModal, disableModal, updateModal } from 'client/actions/modal'
import { coreClient, haikuClient } from 'haiku/client/lib/clients'

es6Promise.polyfill()

function decorateHaikus(haikus, state) {
  if (haikus.length === 0) { return Promise.resolve([]) }

  const qsResourceId = haikus.map((haiku) => `resourceId=${haiku.guid}`).join('&')
  const likeAggQs = `resourceApi=haiku&resourceType=haiku&${qsResourceId}`
  const accountGuid = uselessResourceOwnerId(state.auth.account)
  const likeQs = likeAggQs + `&accountGuid=${accountGuid}`

  return Promise.all([
    coreClient(state).get(`/social/likes?${likeQs}`),
    coreClient(state).get(`/social/likes/aggregates?${likeAggQs}`),
  ]).then((results) => {
    const [likes, likeAggs] = results

    return haikus.map((haiku) => {
      const like = likes.find((like) => like.resourceId === haiku.guid)
      const likeAgg = likeAggs.find((likeAgg) => likeAgg.resourceId === haiku.guid)

      return u({
        likeCount: (likeAgg ? likeAgg.count : 0),
        likedByUser: (like !== undefined),
      }, haiku)
    })
  })
}

export function fetchHaiku(guid) {
  return function (dispatch, getState) {
    const state = getState()
    const show = state.app.show

    if (
      !show.haiku ||
      show.haiku.guid !== guid ||
      (show.isInvalidated && !show.isPending)
    ) {
      dispatch({ type: 'FetchShowHaikuSend' })

      haikuClient(state).get(`/haikus?guid=${guid}`).then((haikus) => {
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({ type: 'FetchShowHaikuSuccess', haiku: haikus[0] })
        })
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
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({ type: 'FetchIndexHaikusSuccess', haikus })
        })
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
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({ type: 'FetchUserHaikusSuccess', haikus })
        })
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

export function likeHaiku(haiku) {
  return function (dispatch, getState) {
    coreClient(getState()).put(`/social/likes/haiku/haiku/${haiku.guid}`).then((response) => {
      dispatch({ type: 'LikeHaikuSuccess', haiku})
    })
  }
}

export function unlikeHaiku(haiku) {
  return function (dispatch, getState) {
    coreClient(getState()).delete(`/social/likes/haiku/haiku/${haiku.guid}`).then((response) => {
      dispatch({ type: 'UnlikeHaikuSuccess', haiku})
    })
  }
}
