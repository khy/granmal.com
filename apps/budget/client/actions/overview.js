import moment from 'moment'

import { budgetClient as client } from 'budget/client/lib/clients'
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
  ConfirmPlannedTxnReceive: 'ConfirmPlannedTxnReceive',
  ConfirmPlannedTxnRequest: 'ConfirmPlannedTxnRequest',
  DeletePlannedTxnReceive: 'DeletePlannedTxnReceive',
  DeletePlannedTxnRequest: 'DeletePlannedTxnRequest',
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
  return function (dispatch, getState) {
    dispatch({
      type: AT.AddAccountRequest
    })

    client(getState()).post('/accounts', newAccount).then((account) => {
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
  return function (dispatch, getState) {
    dispatch({
      type: AT.AddTransferRequest
    })

    client(getState()).post('/transfers', newTransfer).then((transfer) => {
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
  return function (dispatch, getState) {
    dispatch({
      type: AT.AddTxnRequest
    })

    client(getState()).post('/transactions', newTxn).then((txn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchTxnsCard(true))
      dispatch({
        type: AT.AddTxnReceive,
        guid: txn.guid
      })
    })
  }
}

export function confirmPlannedTxn(newTxn) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.ConfirmPlannedTxnRequest
    })

    client(getState()).post('/transactions', newTxn).then((txn) => {
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
  return function (dispatch, getState) {
    dispatch({
      type: AT.DeletePlannedTxnRequest
    })

    client(getState()).delete('/plannedTransactions/' + guid).then(() => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchPlannedTxnsCard(true))
      dispatch({
        type: AT.DeletePlannedTxnReceive,
        guid: guid
      })
    })
  }
}

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.PlannedTxnsCardRequest
    })

    client(getState()).get('/plannedTransactions').then((plannedTxns) => {
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

    client(getState()).get('/projections?date=' + formattedDate).then((projections) => {
      dispatch({ type: AT.ProjectionsCardReceive, projections })
    })
  }
}

export function fetchTxnsCard(force = false) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.TxnsCardRequest
    })

    client(getState()).get('/transactions').then((txns) => {
      dispatch({ type: AT.TxnsCardReceive, txns })
    })
  }
}
