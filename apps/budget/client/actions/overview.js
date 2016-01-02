import moment from 'moment'
import model from '../model'

import { postJson, getJson } from 'budget/client/lib/client'
import { formatDateForModel } from 'budget/client/lib/date'

export const ActionTypes = {
  AddAccountReceive: 'AddAccountReceive',
  AddAccountRequest: 'AddAccountRequest',
  AddPlannedTxnReceive: 'AddPlannedTxnReceive',
  AddPlannedTxnRequest: 'AddPlannedTxnRequest',
  AddTransferReceive: 'AddTransferReceive',
  AddTransferRequest: 'AddTransferRequest',
  AddTxnReceive: 'AddTxnReceive',
  AddTxnRequest: 'AddTxnRequest',
  AddTxnTypeReceive: 'AddTxnTypeReceive',
  AddTxnTypeRequest: 'AddTxnTypeRequest',
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
  ShowAddAccountModal: 'ShowAddAccountModal',
  ShowAddPlannedTxnModal: 'ShowAddPlannedTxnModal',
  ShowResolvePlannedTxnModal: 'ShowResolvePlannedTxnModal',
  ShowAddTransferModal: 'ShowAddTransferModal',
  ShowAddTxnModal: 'ShowAddTxnModal',
  ShowAddTxnTypeModal: 'ShowAddTxnTypeModal',
  ShowAdjustTxnModal: 'ShowAdjustTxnModal',
  TxnsCardReceive: 'TxnsCardReceive',
  TxnsCardRequest: 'TxnsCardRequest',
}

const AT = ActionTypes

export const UserActionTypes = {
  AddAccount: 'AddAccount',
  AddPlannedTxn: 'AddPlannedTxn',
  AddTransfer: 'AddTransfer',
  AddTxn: 'AddTxn',
  AddTxnType: 'AddTxnType',
  AdjustTxn: 'AdjustTxn',
  ConfirmPlannedTxn: 'ConfirmPlannedTxn',
  DeletePlannedTxn: 'DeletePlannedTxn',
  DeleteTxn: 'DeleteTxn'
}

export function addAccount(newAccount) {
  return function (dispatch) {
    dispatch({
      type: AT.AddAccountRequest
    })

    postJson('/budget/api/accounts', newAccount).then((account) => {
      dispatch(fetchAccounts(true))
      dispatch(fetchProjectionsCard(null, true))
      dispatch({
        type: AT.AddAccountReceive,
        name: account.name
      })
    })
  }
}

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.AddPlannedTxnRequest
    })

    postJson('/budget/api/plannedTxns', newPlannedTxn).then((plannedTxn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchPlannedTxnsCard(true))
      dispatch({
        type: AT.AddPlannedTxnReceive,
        guid: plannedTxn.guid
      })
    })
  }
}

export function addTransfer(newTransfer) {
  return function (dispatch) {
    dispatch({
      type: AT.AddTransferRequest
    })

    postJson('/budget/api/transfers', newTransfer).then((transfer) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.AddTransferReceive,
        guid: transfer.guid
      })
    })
  }
}

export function addTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.AddTxnRequest
    })

    postJson('/budget/api/txns', newTxn).then((txn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.AddTxnReceive,
        guid: txn.guid
      })
    })
  }
}

export function addTxnType(newTxnType) {
  return function (dispatch) {
    dispatch({ type: AT.AddTxnTypeRequest })

    postJson('/budget/api/txnTypes', newTxnType).then((txnType) => {
      dispatch(fetchTxnTypes(true))
      dispatch({
        type: AT.AddTxnTypeReceive,
        name: txnType.name,
      })
    })
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

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: AT.PlannedTxnsCardRequest
    })

    if (force) { model.invalidate(['plannedTransactions']) }

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minDate', 'maxDate', 'minAmount', 'maxAmount']],
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
      ['transactions', {from: 0, to: 9}, ['guid', 'date', 'amount']],
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
