import moment from 'moment'
import model from './model'

export const ActionTypes = {
  ReceivePlannedTxnsCard: 'ReceivePlannedTxnsCard',
  ReceiveProjectionsCard: 'ReceiveProjectionsCard',
  ReceiveTxnsCard: 'ReceiveTxnsCard',
  RequestPlannedTxnsCard: 'RequestPlannedTxnsCard',
  RequestProjectionsCard: 'RequestProjectionsCard',
  RequestTxnsCard: 'RequestTxnsCard',
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
    const _date = moment(date || getState().projectionsCard.date)

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
