import es6Promise from 'es6-promise'
import _compact from 'lodash/compact'
import _concat from 'lodash/concat'
import _get from 'lodash/get'
import _last from 'lodash/last'
import _map from 'lodash/map'
import moment from 'moment'
import u from 'updeep'

import { uselessResourceOwnerId } from 'common/account'
import { showModal, hideModal, enableModal, disableModal, updateModal } from 'client/actions/modal'
import { coreClient, haikuClient } from 'haiku/client/lib/clients'

es6Promise.polyfill()

function decorateHaikus(haikus, state) {
  if (haikus.length === 0) { return Promise.resolve([]) }

  const haikuGuids = haikus.map((haiku) => haiku.guid)
  const inResponseToGuids = haikus.map((haiku) => _get(haiku, 'inResponseTo.guid'))
  const allGuids = _compact(_concat(haikuGuids, inResponseToGuids))

  const qsResourceId = allGuids.map((guid) => `resourceId=${guid}`).join('&')
  const likeAggQs = `resourceApi=haiku&resourceType=haiku&${qsResourceId}`

  const accountGuid = uselessResourceOwnerId(state.auth.account)
  let likesPromise

  if (accountGuid) {
    const likeQs = likeAggQs + `&accountGuid=${accountGuid}`
    likesPromise = coreClient(state).get(`/social/likes?${likeQs}`)
  } else {
    likesPromise = Promise.resolve([])
  }

  return Promise.all([
    likesPromise,
    coreClient(state).get(`/social/likes/aggregates?${likeAggQs}`),
  ]).then((results) => {
    const [likes, likeAggs] = results

    const decorateHaiku = (haiku, inResponseTo) => {
      const like = likes.find((like) => like.resourceId === haiku.guid)
      const likeAgg = likeAggs.find((likeAgg) => likeAgg.resourceId === haiku.guid)

      return u({
        likeCount: (likeAgg ? likeAgg.count : 0),
        likedByUser: (like !== undefined),
        inResponseTo: inResponseTo
      }, haiku)
    }

    return haikus.map((haiku) => {
      let inResponseTo

      if (haiku.inResponseTo) {
        inResponseTo = decorateHaiku(haiku.inResponseTo)
      }

      return decorateHaiku(haiku, inResponseTo)
    })
  })
}

const HaikuPageLimit = 20

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
      dispatch({ type: 'FetchShowHaikuResponsesSend' })

      return Promise.all([
        haikuClient(state).get(`/haikus?guid=${guid}`),
        haikuClient(state).get(`/haikus?inResponseTo=${guid}&p.limit=${HaikuPageLimit}`)
      ]).then((results) => {
        const [haikus, responses] = results

        Promise.all([
          decorateHaikus(haikus, state),
          decorateHaikus(responses, state)
        ]).then((results) => {
          const [haikus, responses] = results

          dispatch({ type: 'FetchShowHaikuSuccess', haiku: haikus[0] })
          dispatch({ type: 'FetchShowHaikuResponsesSuccess', haikus: responses })
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

      haikuClient(state).get(`/haikus?p.limit=${HaikuPageLimit}`).then((haikus) => {
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({ type: 'FetchIndexHaikusSuccess', haikus })
        })
      })
    }
  }
}

export function fetchMoreIndexHaikus() {
  return function (dispatch, getState) {
    const state = getState()
    const currentHaikus = state.app.index.haikus.haikus

    if (currentHaikus.length > 0) {
      dispatch({ type: 'FetchIndexHaikusSend' })
      const lastGuid = _last(currentHaikus).guid

      haikuClient(state).get(`/haikus?p.after=${lastGuid}&p.limit=${HaikuPageLimit}`).then((haikus) => {
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({
            type: 'FetchIndexHaikusSuccess',
            haikus: _concat(currentHaikus, haikus),
            isLastPage: (haikus.length < HaikuPageLimit),
          })
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

      haikuClient(state).get(`/haikus?user=${handle}&p.limit=${HaikuPageLimit}`).then((haikus) => {
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({
            type: 'FetchUserHaikusSuccess', haikus,
            isLastPage: (haikus.length < HaikuPageLimit),
          })
        })
      })
    }
  }
}

export function fetchMoreUserHaikus() {
  return function (dispatch, getState) {
    const state = getState()
    const handle = state.app.user.handle
    const currentHaikus = state.app.user.haikus.haikus

    if (currentHaikus.length > 0) {
      dispatch({ type: 'FetchUserHaikusSend' })
      const lastGuid = _last(currentHaikus).guid

      haikuClient(state).get(`/haikus?user=${handle}&p.after=${lastGuid}&p.limit=${HaikuPageLimit}`).then((haikus) => {
        decorateHaikus(haikus, state).then((haikus) => {
          dispatch({
            type: 'FetchUserHaikusSuccess',
            haikus: _concat(currentHaikus, haikus),
            isLastPage: (haikus.length < HaikuPageLimit),
          })
        })
      })
    }
  }
}

export function showNewHaikuModal(inResponseTo) {
  return function (dispatch, getState) {
    const state = getState()

    if (state.auth.account) {
      dispatch(showModal('NewHaiku', { inResponseTo }))
    } else {
      const message = inResponseTo ?
        'You must log in to reply to a haiku.' :
        'You must log in to add a haiku.'

      dispatch(showModal('LogInModal', { message }))
    }
  }
}

export function submitNewHaikuModal(newHaiku) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    haikuClient(getState()).post('/haikus', newHaiku, true).then((response) => {
      if (response.ok) {
        response.json().then((haiku) => {
          dispatch({ type: 'ReloadApp' })
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
    const state = getState()

    if (state.auth.account) {
      coreClient(state).put(`/social/likes/haiku/haiku/${haiku.guid}`).then((response) => {
        dispatch({ type: 'ReloadApp' })
      })
    } else {
      dispatch(showModal('LogInModal', {message: 'You must log in to like a haiku.'}))
    }
  }
}

export function unlikeHaiku(haiku) {
  return function (dispatch, getState) {
    coreClient(getState()).delete(`/social/likes/haiku/haiku/${haiku.guid}`).then((response) => {
      dispatch({ type: 'ReloadApp' })
    })
  }
}
