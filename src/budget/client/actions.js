import moment from 'moment'
import model from './model'

import { formatDateForModel } from 'budget/client/lib/date'

export const ActionTypes = {
  HideModal: 'HideModal',
  PlannedTxnsCardReceive: 'PlannedTxnsCardReceive',
  PlannedTxnsCardRequest: 'PlannedTxnsCardRequest',
  ProjectionsCardReceive: 'ProjectionsCardReceive',
  ProjectionsCardRequest: 'ProjectionsCardRequest',
  ReceiveAddPlannedTxn: 'ReceiveAddPlannedTxn',
  ReceiveAddTxn: 'ReceiveAddTxn',
  ReceiveAdjustTxn: 'ReceiveAdjustTxn',
  ReceiveConfirmPlannedTxn: 'ReceiveConfirmPlannedTxn',
  ReceiveDeletePlannedTxn: 'ReceiveDeletePlannedTxn',
  ReceiveDeleteTxn: 'ReceiveDeleteTxn',
  ReceiveModel: 'ReceiveModel',
  RequestAddPlannedTxn: 'RequestAddPlannedTxn',
  RequestAddTxn: 'RequestAddTxn',
  RequestAdjustTxn: 'RequestAdjustTxn',
  RequestConfirmPlannedTxn: 'RequestConfirmPlannedTxn',
  RequestDeletePlannedTxn: 'RequestDeletePlannedTxn',
  RequestDeleteTxn: 'RequestDeleteTxn',
  ShowAddPlannedTxnModal: 'ShowAddPlannedTxnModal',
  ShowResolvePlannedTxnModal: 'ShowResolvePlannedTxnModal',
  ShowAddTxnModal: 'ShowAddTxnModal',
  ShowAdjustTxnModal: 'ShowAdjustTxnModal',
  TxnsCardReceive: 'TxnsCardReceive',
  TxnsCardRequest: 'TxnsCardRequest',
}

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
      type: ActionTypes.RequestAddPlannedTxn
    })

    model.call('plannedTransactions.add', [newPlannedTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveAddPlannedTxn,
          guid: response.json.plannedTransactions.latest.guid
        })
      }
    )
  }
}

export function addTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestAddTxn
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveAddTxn,
          guid: response.json.transactions.latest.guid
        })
      }
    )
  }
}

export function adjustTxn(guid, newTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestAdjustTxn
    })

    model.call('transactions.adjust', [guid, newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveAdjustTxn,
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
      type: ActionTypes.RequestConfirmPlannedTxn
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveConfirmPlannedTxn,
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
      type: ActionTypes.RequestDeletePlannedTxn
    })

    model.call('plannedTransactions.delete', [guid]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveDeletePlannedTxn,
          guid: guid
        })
      }
    )
  }
}

export function deleteTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestDeleteTxn
    })

    model.call('transactions.delete', [guid]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveDeleteTxn,
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
        dispatch({
          type: ActionTypes.ReceiveModel,
          model: response.json,
        })
      }
    )
  }
}

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.PlannedTxnsCardRequest
    })

    if (force) { model.invalidate(['plannedTransactions']) }

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        dispatch(receiveModel(response.json))
        dispatch({ type: ActionTypes.PlannedTxnsCardReceive })
      }
    )
  }
}

export function fetchProjectionsCard(date, force = false) {
  return function (dispatch, getState) {
    const _date = moment(date || getState().overview.projectionsCard.date)

    dispatch({
      type: ActionTypes.ProjectionsCardRequest,
      date: _date.format()
    })

    const formattedDate = formatDateForModel(_date)

    if (force) { model.invalidate(['projectionsByDate', formattedDate]) }

    model.get(
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => {
        dispatch(receiveModel(response.json))
        dispatch({ type: ActionTypes.ProjectionsCardReceive })
      }
    )
  }
}

export function fetchTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.TxnsCardRequest
    })

    if (force) { model.invalidate(['transactions']) }

    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['transactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        dispatch(receiveModel(response.json))
        dispatch({ type: ActionTypes.TxnsCardReceive })
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
        dispatch({
          type: ActionTypes.ReceiveModel,
          model: response.json
        })
      }
    )
  }
}

export function receiveModel(model) {
  return {
    type: ActionTypes.ReceiveModel,
    model: model,
  }
}
