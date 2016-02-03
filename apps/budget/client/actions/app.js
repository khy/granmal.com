import moment from 'moment'

import client from 'budget/client/lib/uselessClient'
import { formatDateForModel } from 'budget/client/lib/date'

export const ActionTypes = {
  BootstrapReceived: 'BootstrapReceived',
  BootstrapRequested: 'BootstrapRequested',
  DismissPrestitial: 'DismissPrestitial',
  HideModal: 'HideModal',
  SetAccounts: 'SetAccounts',
  SetAccountTypes: 'SetAccountTypes',
  SetTxnTypes: 'SetTxnTypes',
}

const AT = ActionTypes

export function bootstrap() {
  return function (dispatch) {
    dispatch({ type: AT.BootstrapRequested })

    Promise.all([
      client.get('/accounts'),
      client.get('/accountTypes'),
      client.get('/transactionTypes'),
    ]).then( (results) => {
      dispatch({ type: AT.SetAccounts, accounts: results[0] })
      dispatch({ type: AT.SetAccountTypes, accountTypes: results[1] })
      dispatch({ type: AT.SetTxnTypes, txnTypes: results[2] })
      dispatch({ type: AT.BootstrapReceived })
    })
  }
}

export function fetchAccounts() {
  return function (dispatch) {
    client.get('/accounts').then( accounts => {
      dispatch({ type: AT.SetAccounts, accounts })
    })
  }
}

export function fetchAccountTypes() {
  return function (dispatch) {
    client.get('/accountTypes').then( accountTypes => {
      dispatch({ type: AT.SetAccountTypes, accountTypes })
    })
  }
}

export function fetchTxnTypes() {
  return function (dispatch) {
    client.get('/transactionTypes').then( txnTypes => {
      dispatch({ type: AT.SetTxnTypes, txnTypes })
    })
  }
}
