import moment from 'moment'
import model from './model'

export const ActionTypes = {
  HideModal: 'HideModal',
  ReceiveConfirmedPlannedTxn: 'ReceiveConfirmedPlannedTxn',
  ReceiveNewPlannedTxn: 'ReceiveNewPlannedTxn',
  ReceivePlannedTxnsCard: 'ReceivePlannedTxnsCard',
  ReceiveProjectionsCard: 'ReceiveProjectionsCard',
  ReceiveTxnsCard: 'ReceiveTxnsCard',
  RequestConfirmedPlannedTxn: 'RequestConfirmedPlannedTxn',
  RequestNewPlannedTxn: 'RequestNewPlannedTxn',
  RequestPlannedTxnsCard: 'RequestPlannedTxnsCard',
  RequestProjectionsCard: 'RequestProjectionsCard',
  RequestTxnsCard: 'RequestTxnsCard',
  ShowAddPlannedTxnModal: 'ShowAddPlannedTxnModal',
  ShowResolvePlannedTxnModal: 'ShowResolvePlannedTxnModal',
}

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestNewPlannedTxn
    })

    model.call('plannedTransactions.add', [newPlannedTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveNewPlannedTxn,
          guid: response.json.plannedTransactions.latest.guid
        })
      }
    )
  }
}

export function confirmPlannedTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestConfirmedPlannedTxn
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveConfirmedPlannedTxn,
          guid: response.json.transactions.latest.guid
        })
      }
    )
  }
}

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestPlannedTxnsCard
    })

    if (force) { model.invalidate(['plannedTransactions']) }

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const plannedTxns = response.json.plannedTransactions

        dispatch({
          type: ActionTypes.ReceivePlannedTxnsCard,
          plannedTxns
        })
      }
    )
  }
}

export function fetchProjectionsCard(date, force = false) {
  return function (dispatch, getState) {
    const _date = moment(date || getState().overview.projectionsCard.date)

    dispatch({
      type: ActionTypes.RequestProjectionsCard,
      date: _date
    })

    const formattedDate = _date.format('YYYY-MM-DD')

    if (force) { model.invalidate(['projectionsByDate', formattedDate]) }

    model.get(
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => {
        const projections = response.json.projectionsByDate[formattedDate]

        dispatch({
          type: ActionTypes.ReceiveProjectionsCard,
          date: _date,
          projections
        })
      }
    )
  }
}

export function fetchTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestTxnsCard
    })

    if (force) { model.invalidate(['transactions']) }

    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['transactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const txns = response.json.transactions

        dispatch({
          type: ActionTypes.ReceiveTxnsCard,
          txns
        })
      }
    )
  }
}
