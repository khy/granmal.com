import moment from 'moment'
import model from './model'

import { formatDateForModel } from 'budget/client/lib/date'

export const ActionTypes = {
  AddPlannedTxnReceive: 'AddPlannedTxnReceive',
  AddPlannedTxnRequest: 'AddPlannedTxnRequest',
  AddTxnReceive: 'AddTxnReceive',
  AddTxnRequest: 'AddTxnRequest',
  AdjustTxnReceive: 'AdjustTxnReceive',
  AdjustTxnRequest: 'AdjustTxnRequest',
  ConfirmPlannedTxnReceive: 'ConfirmPlannedTxnReceive',
  ConfirmPlannedTxnRequest: 'ConfirmPlannedTxnRequest',
  DeletePlannedTxnReceive: 'DeletePlannedTxnReceive',
  DeletePlannedTxnRequest: 'DeletePlannedTxnRequest',
  DeleteTxnReceive: 'DeleteTxnReceive',
  DeleteTxnRequest: 'DeleteTxnRequest',
  HideModal: 'HideModal',
  PlannedTxnsCardReceive: 'PlannedTxnsCardReceive',
  PlannedTxnsCardRequest: 'PlannedTxnsCardRequest',
  ProjectionsCardReceive: 'ProjectionsCardReceive',
  ProjectionsCardRequest: 'ProjectionsCardRequest',
  SetAccounts: 'SetAccounts',
  SetTxnTypes: 'SetTxnTypes',
  ShowAddPlannedTxnModal: 'ShowAddPlannedTxnModal',
  ShowResolvePlannedTxnModal: 'ShowResolvePlannedTxnModal',
  ShowAddTxnModal: 'ShowAddTxnModal',
  ShowAdjustTxnModal: 'ShowAdjustTxnModal',
  TxnsCardReceive: 'TxnsCardReceive',
  TxnsCardRequest: 'TxnsCardRequest',
}

const AT = ActionTypes

export const UserActionTypes = {
  AddPlannedTxn: 'AddPlannedTxn',
  AddTxn: 'AddTxn',
  AdjustTxn: 'AdjustTxn',
  ConfirmPlannedTxn: 'ConfirmPlannedTxn',
  DeletePlannedTxn: 'DeletePlannedTxn',
  DeleteTxn: 'DeleteTxn'
}

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.AddPlannedTxnRequest
    })

    model.call('plannedTransactions.add', [newPlannedTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: AT.AddPlannedTxnReceive,
          guid: response.json.plannedTransactions.latest.guid
        })
      }
    )
  }
}

export function addTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.AddTxnRequest
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: AT.AddTxnReceive,
          guid: response.json.transactions.latest.guid
        })
      }
    )
  }
}

export function adjustTxn(guid, newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.AdjustTxnRequest
    })

    model.call('transactions.adjust', [guid, newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: AT.AdjustTxnReceive,
          oldGuid: guid,
          newGuid: response.json.transactions.latest.guid,
        })
      }
    )
  }
}

export function confirmPlannedTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.ConfirmPlannedTxnRequest
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: AT.ConfirmPlannedTxnReceive,
          plannedTxnGuid: newTxn.plannedTransactionGuid,
          txnGuid: response.json.transactions.latest.guid
        })
      }
    )
  }
}

export function deletePlannedTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: AT.DeletePlannedTxnRequest
    })

    model.call('plannedTransactions.delete', [guid]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: AT.DeletePlannedTxnReceive,
          guid: guid
        })
      }
    )
  }
}

export function deleteTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: AT.DeleteTxnRequest
    })

    model.call('transactions.delete', [guid]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: AT.DeleteTxnReceive,
          guid: guid
        })
      }
    )
  }
}

export function fetchAccounts() {
  return function (dispatch) {
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

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: AT.PlannedTxnsCardRequest
    })

    if (force) { model.invalidate(['plannedTransactions']) }

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const plannedTxns = response ? response.json.plannedTransactions : []
        dispatch({ type: AT.PlannedTxnsCardReceive, plannedTxns })
      }
    )
  }
}

export function fetchProjectionsCard(date, force = false) {
  return function (dispatch, getState) {
    const _date = moment(date || getState().overview.projectionsCard.date)

    dispatch({
      type: AT.ProjectionsCardRequest,
      date: _date.format()
    })

    const formattedDate = formatDateForModel(_date)

    if (force) { model.invalidate(['projectionsByDate', formattedDate]) }

    model.get(
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => {
        const projections = response ? response.json.projectionsByDate[formattedDate] : []
        dispatch({ type: AT.ProjectionsCardReceive, projections })
      }
    )
  }
}

export function fetchTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: AT.TxnsCardRequest
    })

    if (force) { model.invalidate(['transactions']) }

    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['transactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const txns = response ? response.json.transactions : []
        dispatch({ type: AT.TxnsCardReceive, txns })
      }
    )
  }
}

export function fetchTxnTypes() {
  return function (dispatch) {
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
