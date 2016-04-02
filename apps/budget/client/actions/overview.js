import moment from 'moment'

import { budgetClient } from 'budget/client/lib/clients'
import { formatDateForModel } from 'budget/client/lib/date'
import { fetchAccounts } from 'budget/client/actions/app'
import { hideModal, disableModal } from 'budget/client/actions/modal'

export const ActionTypes = {
  AddAccountReceive: 'AddAccountReceive',
  AddPlannedTxnReceive: 'AddPlannedTxnReceive',
  AddTransferReceive: 'AddTransferReceive',
  AddPlannedTxnTxnReceive: 'AddPlannedTxnTxnReceive',
  PlannedTxnsCardReceive: 'PlannedTxnsCardReceive',
  PlannedTxnsCardRequest: 'PlannedTxnsCardRequest',
  ProjectionsCardReceive: 'ProjectionsCardReceive',
  ProjectionsCardRequest: 'ProjectionsCardRequest',
}

const AT = ActionTypes

export const UserActionTypes = {
  AddAccount: 'AddAccount',
  AddTransfer: 'AddTransfer',
  AddPlannedTxnTxn: 'AddPlannedTxnTxn',
}

export function addAccount(newAccount) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/accounts', newAccount).then((account) => {
      dispatch(fetchAccounts(true))
      dispatch(fetchProjectionsCard(null, true))
      dispatch({
        type: AT.AddAccountReceive,
        name: account.name
      })
      dispatch(hideModal())
    })
  }
}

export function addTransfer(newTransfer) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/transfers', newTransfer).then((transfer) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch({
        type: AT.AddTransferReceive,
        guid: transfer.guid
      })
      dispatch(hideModal())
    })
  }
}

export function addPlannedTxnTxn(newTxn) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post('/transactions', newTxn).then((txn) => {
      dispatch(fetchProjectionsCard(null, true))
      dispatch(fetchPlannedTxnsCard(true))
      dispatch({
        type: AT.AddPlannedTxnTxnReceive,
        plannedTxnGuid: newTxn.plannedTransactionGuid,
        txnGuid: txn.guid
      })
      dispatch(hideModal())
    })
  }
}

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch, getState) {
    dispatch({
      type: AT.PlannedTxnsCardRequest
    })

    const minDateFrom = formatDateForModel(moment().subtract(30, 'days'))
    const minDateTo = formatDateForModel(moment())

    budgetClient(getState()).get(`/plannedTransactions?minDateFrom=${minDateFrom}&minDateTo=${minDateTo}&transactionCountTo=0`).then((plannedTxns) => {
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

    budgetClient(getState()).get('/projections?date=' + formattedDate).then((projections) => {
      dispatch({ type: AT.ProjectionsCardReceive, projections })
    })
  }
}
