var model = require('./model')

export const ActionTypes = {
  RequestProjectionsCard: 'RequestProjectionsCard',
  ReceiveProjectionsCard: 'ReceiveProjectionsCard',
  RequestPlannedTxnsCard: 'RequestPlannedTxnsCard',
  ReceivePlannedTxnsCard: 'ReceivePlannedTxnsCard',
  RequestTxnsCard: 'RequestTxnsCard',
  ReceiveTxnsCard: 'ReceiveTxnsCard'
}

export function fetchProjectionsCard(date) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestProjectionsCard,
      date: date
    })

    const _date = date.format('YYYY-MM-DD')

    model.get(
      ['projectionsByDate', _date, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', _date, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => {
        const projections = response.json.projectionsByDate[_date]

        dispatch({
          type: ActionTypes.ReceiveProjectionsCard,
          date,
          projections
        })
      }
    )
  }
}

export function fetchPlannedTxnsCard() {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestPlannedTxnsCard
    })

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

        console.log(txns)

        dispatch({
          type: ActionTypes.ReceiveTxnsCard,
          txns
        })
      }
    )
  }
}
