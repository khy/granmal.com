import moment from 'moment'
import _find from 'lodash/find'
import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'

import { budgetClient as client } from 'budget/client/lib/clients'
import { formatDateForModel } from 'budget/client/lib/date'
import { uselessResourceOwnerId } from 'budget/client/lib/authAccount'

export const ActionTypes = {
  BootstrapReceived: 'BootstrapReceived',
  BootstrapRequested: 'BootstrapRequested',
  DismissPrestitial: 'DismissPrestitial',
  SetAccounts: 'SetAccounts',
  SetAccountTypes: 'SetAccountTypes',
  SetContexts: 'SetContexts',
  SelectContext: 'SelectContext',
  SetTxnTypes: 'SetTxnTypes',
}

const AT = ActionTypes

export function bootstrap() {
  return function (dispatch, getState) {
    dispatch({ type: AT.BootstrapRequested })

    Promise.all([
      client(getState()).get('/accounts'),
      client(getState()).get('/accountTypes'),
      client(getState()).get('/contexts'),
      client(getState()).get('/transactionTypes'),
    ]).then( (results) => {
      dispatch({ type: AT.SetAccounts, accounts: results[0] })
      dispatch({ type: AT.SetAccountTypes, accountTypes: results[1] })
      dispatch({ type: AT.SetContexts, contexts: results[2] })
      dispatch(ensureUserContext())
      dispatch(ensureSelectedContext())
      dispatch({ type: AT.SetTxnTypes, txnTypes: results[3] })
      dispatch({ type: AT.BootstrapReceived })
    })
  }
}

export function ensureUserContext() {
  return function (dispatch, getState) {
    const state = getState()
    const userGuid = uselessResourceOwnerId(state.auth.account)
    const existingContexts = state.app.contexts
    const userContext = existingContexts.find((context) => {
      return context.createdBy.guid === userGuid
    })

    if (!userContext) {
      const attrs = {name: 'Default', userGuids: [userGuid]}
      client(state).post('/contexts', attrs).then( context => {
        dispatch({ type: AT.SetContexts, contexts: [context,...existingContexts] })
      })
    }
  }
}

export function ensureSelectedContext() {
  return function (dispatch, getState) {
    const state = getState()

    if (!state.app.selectedContextGuid) {
      let selectedContext

      selectedContext = _find(state.app.contexts, (context) => {
        context.createdBy.guid === state.auth.account.guid
      })

      if (!selectedContext) {
        selectedContext = state.app.contexts[0]
      }

      dispatch(selectContext(selectedContext.guid))
    }
  }
}

export function fetchAccounts() {
  return function (dispatch, getState) {
    client(getState()).get('/accounts').then( accounts => {
      dispatch({ type: AT.SetAccounts, accounts })
    })
  }
}

export function fetchAccountTypes() {
  return function (dispatch, getState) {
    client(getState()).get('/accountTypes').then( accountTypes => {
      dispatch({ type: AT.SetAccountTypes, accountTypes })
    })
  }
}

export function fetchContexts() {
  return function (dispatch, getState) {
    client(getState()).get('/contexts').then( contexts => {
      dispatch({ type: AT.SetContexts, contexts })
      dispatch(ensureSelectedContext())
    })
  }
}

export function fetchTxnTypes() {
  return function (dispatch, getState) {
    client(getState()).get('/transactionTypes').then( txnTypes => {
      dispatch({ type: AT.SetTxnTypes, txnTypes })
    })
  }
}

export function selectContext(guid) {
  return function (dispatch, getState) {
    return fetch('/accountAppState/budget', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedContextGuid: guid }),
      credentials: 'same-origin',
    }).then((data) => {
      dispatch({ type: AT.SelectContext, guid })
    })
  }
}
