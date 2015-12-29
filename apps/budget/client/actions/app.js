import moment from 'moment'
import model from '../model'

import { formatDateForModel } from 'budget/client/lib/date'

export const ActionTypes = {
  BootstrapReceived: 'BootstrapReceived',
  DismissPrestitial: 'DismissPrestitial',
  HideModal: 'HideModal',
  SetAccounts: 'SetAccounts',
  SetAccountTypes: 'SetAccountTypes',
  SetTxnTypes: 'SetTxnTypes',
}

const AT = ActionTypes

export function bootstrap() {
  return function (dispatch) {
    model.get(
      ['accounts', {from: 0, to: 9}, ['guid', 'name']],
      ['accountTypes', {from: 0, to: 9}, ['key', 'name']],
      ['transactionTypes', {from: 0, to: 50}, ['guid', 'name']]
    ).then( response => {
      dispatch({ type: AT.SetAccounts, accounts: response.json.accounts })
      dispatch({ type: AT.SetAccountTypes, accountTypes: response.json.accountTypes })
      dispatch({ type: AT.SetTxnTypes, txnTypes: response.json.transactionTypes })
      dispatch({ type: AT.BootstrapReceived })
    })
  }
}

export function fetchAccounts(force = false) {
  return function (dispatch) {
    if (force) { model.invalidate(['accounts']) }

    model.get(
      ['accounts', {from: 0, to: 9}, ['guid', 'name']]
    ).then(
      response => {
        const accounts = response ? response.json.accounts : []
        dispatch({ type: AT.SetAccounts, accounts })
      }
    )
  }
}

export function fetchAccountTypes() {
  return function (dispatch) {
    model.get(
      ['accountTypes', {from: 0, to: 9}, ['key', 'name']]
    ).then(
      response => {
        const accountTypes = response ? response.json.accountTypes : []
        dispatch({ type: AT.SetAccountTypes, accountTypes })
      }
    )
  }
}

export function fetchTxnTypes(force = false) {
  return function (dispatch) {
    if (force) { model.invalidate(['transactionTypes']) }

    model.get(
      ['transactionTypes', {from: 0, to: 50}, ['guid', 'name']]
    ).then(
      response => {
        const txnTypes = response ? response.json.transactionTypes : []
        dispatch({ type: AT.SetTxnTypes, txnTypes })
      }
    )
  }
}
