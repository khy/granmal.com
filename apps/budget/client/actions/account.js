import _map from 'lodash/map'
import moment from 'moment'

import { formatDateForModel } from 'budget/client/lib/date'
import { budgetClient as client } from 'budget/client/lib/clients'
import { hideModal, disableModal } from 'budget/client/actions/modal'
import { fetchAccounts } from 'budget/client/actions/app'

export const ActionTypes = {
  AddTxnsReceive: 'AddTxnsReceive',
  HistoryFetchReceive: 'HistoryFetchReceive',
  HistoryFetchRequest: 'HistoryFetchRequest',
  PlannedTxnsAddReceive: 'PlannedTxnsAddReceive',
  PlannedTxnsFetchReceive: 'PlannedTxnsFetchReceive',
  PlannedTxnsFetchRequest: 'PlannedTxnsFetchRequest',
  TxnsFetchReceive: 'TxnsFetchReceive',
  TxnsFetchRequest: 'TxnsFetchRequest',
}

const AT = ActionTypes

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    client(getState()).post('/plannedTransactions', newPlannedTxn).then((plannedTxn) => {
      dispatch(fetchPlannedTxns(plannedTxn.accountGuid))
      dispatch({
        type: AT.PlannedTxnsAddReceive,
        plannedTxn
      })
      dispatch(hideModal())
    })
  }
}

export function addTxn(newTxn) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    client(getState()).post('/transactions', newTxn).then((txn) => {
      dispatch(fetchTxns(txn.accountGuid))
      dispatch(fetchAccounts())
      dispatch(fetchHistory(txn.accountGuid))
      dispatch({
        type: AT.AddTxnsReceive,
        txn
      })
      dispatch(hideModal())
    })
  }
}

export function fetchHistory(accountGuid) {
  return function (dispatch, getState) {
    dispatch({ type: AT.HistoryFetchRequest })

    const startOfLastMonth = formatDateForModel(moment().subtract(1, 'months').startOf('month'))
    const startOfThisMonth = formatDateForModel(moment().startOf('month'))
    const startOfNextMonth = formatDateForModel(moment().add(1, 'months').startOf('month'))

    const _client = client(getState)
    const baseUrl = '/aggregates/accountHistory/' + accountGuid
    const lastMonthUrl = baseUrl + `?start=${startOfLastMonth}&end=${startOfThisMonth}`
    const thisMonthUrl = baseUrl + `?start=${startOfThisMonth}&end=${startOfNextMonth}`

    Promise.all([
      _client.get(lastMonthUrl),
      _client.get(thisMonthUrl),
    ]).then( (results) => {
      dispatch({
        type: AT.HistoryFetchReceive,
        lastMonthIntervals: results[0],
        thisMonthIntervals: results[1],
      })
    })
  }
}

export function fetchPlannedTxns(accountGuid, page = 1) {
  return function (dispatch, getState) {
    dispatch({ type: AT.PlannedTxnsFetchRequest })

    const url = '/plannedTransactions?account=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    client(getState()).get(url, true).then(response  => {
      response.json().then(plannedTxns => {
        dispatch({
          type: AT.PlannedTxnsFetchReceive,
          linkHeader: response.headers.get('Link'),
          plannedTxns
        })
      })
    })
  }
}

export function fetchTxns(accountGuid, page = 1) {
  return function (dispatch, getState) {
    dispatch({ type: AT.TxnsFetchRequest })

    const url = '/transactions?account=' + accountGuid + '&p.page=' + page + '&p.limit=10'

    client(getState()).get(url, true).then( response => {
      response.json().then(txns => {
        dispatch({
          type: AT.TxnsFetchReceive,
          linkHeader: response.headers.get('Link'),
          txns
        })
      })
    })
  }
}
