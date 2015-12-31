import moment from 'moment'
import model from '../model'

import { getJson } from 'budget/client/lib/client'
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
      getJson('/budget/api/accounts'),
      getJson('/budget/api/accountTypes'),
      getJson('/budget/api/txnTypes'),
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
    getJson('/budget/api/accounts').then( accounts => {
      dispatch({ type: AT.SetAccounts, accounts })
    })
  }
}

export function fetchAccountTypes() {
  return function (dispatch) {
    getJson('/budget/api/accountTypes').then( accountTypes => {
      dispatch({ type: AT.SetAccountTypes, accountTypes })
    })
  }
}

export function fetchTxnTypes() {
  return function (dispatch) {
    getJson('/budget/api/txnTypes').then( txnTypes => {
      dispatch({ type: AT.SetTxnTypes, txnTypes })
    })
  }
}
