import moment from 'moment'

import client from 'budget/client/lib/clients'
import { formatDateForModel } from 'budget/client/lib/date'

export const ActionTypes = {
  BootstrapReceived: 'BootstrapReceived',
  BootstrapRequested: 'BootstrapRequested',
  DismissPrestitial: 'DismissPrestitial',
  HideModal: 'HideModal',
  SetAccounts: 'SetAccounts',
  SetAccountTypes: 'SetAccountTypes',
  SetContexts: 'SetContexts',
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
      dispatch({ type: AT.SetTxnTypes, txnTypes: results[3] })
      dispatch({ type: AT.BootstrapReceived })
    })
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
