import moment from 'moment'

import client from 'budget/client/lib/client'
import { formatDateForModel } from 'budget/client/lib/date'
import { fetchAccounts } from 'budget/client/actions/app'

export const ActionTypes = {
  AddAccountReceive: 'AddAccountReceive',
  AddAccountRequest: 'AddAccountRequest',
  AddPlannedTxnReceive: 'AddPlannedTxnReceive',
  AddPlannedTxnRequest: 'AddPlannedTxnRequest',
  AddTransferReceive: 'AddTransferReceive',
  AddTransferRequest: 'AddTransferRequest',
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

    client.post('/accounts', newAccount).then((account) => {
      dispatch(fetchAccounts(true))
      dispatch(fetchProjectionsCard(null, true))
      dispatch({
        type: AT.AddAccountReceive,
        name: account.name
      })
    })
  }
}

export function addTransfer(newTransfer) {
  return function (dispatch) {
    dispatch({
      type: AT.AddTransferRequest
    })

    client.post('/transfers', newTransfer).then((transfer) => {
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

    client.post('/transactions', newTxn).then((txn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.AddTxnReceive,
        guid: txn.guid
      })
    })
  }
}

export function adjustTxn(guid, newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.AdjustTxnRequest
    })

    client.post('/transactions/' + guid + '/adjustments', newTxn).then((txn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.AdjustTxnReceive,
        oldGuid: guid,
        newGuid: txn.guid,
      })
    })
  }
}

export function confirmPlannedTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: AT.ConfirmPlannedTxnRequest
    })

    client.post('/transactions', newTxn).then((txn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchPlannedTxnsCard(true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.ConfirmPlannedTxnReceive,
        plannedTxnGuid: newTxn.plannedTransactionGuid,
        txnGuid: txn.guid
      })
    })
  }
}

export function deletePlannedTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: AT.DeletePlannedTxnRequest
    })

    client.delete('/plannedTransactions/' + guid).then(() => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchPlannedTxnsCard(true))
      dispatch({
        type: AT.DeletePlannedTxnReceive,
        guid: guid
      })
    })
  }
}

export function deleteTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: AT.DeleteTxnRequest
    })

    client.delete('/transactions/' + guid).then(() => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.DeleteTxnReceive,
        guid: guid
      })
    })
  }
}

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: AT.PlannedTxnsCardRequest
    })

    client.get('/plannedTransactions').then((plannedTxns) => {
      dispatch({ type: AT.PlannedTxnsCardReceive, plannedTxns })
    })
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

    client.get('/projections?date=' + formattedDate).then((projections) => {
      dispatch({ type: AT.ProjectionsCardReceive, projections })
    })
  }
}

export function fetchTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: AT.TxnsCardRequest
    })

    client.get('/transactions').then((txns) => {
      dispatch({ type: AT.TxnsCardReceive, txns })
    })
  }
}
