var model = require('./model')

export const ActionTypes = {
  RequestProjectionsCard: 'REQUEST_PROJECTIONS_CARD',
  ReceiveProjectionsCard: 'RECEIVE_PROJECTIONS_CARD',
  RequestPlannedTxnsCard: 'REQUEST_PLANNED_TXNS_CARD',
  ReceivePlannedTxnsCard: 'RECEIVE_PLANNED_TXNS_CARD'
}

function requestProjections(date) {
  return {
    type: ActionTypes.RequestProjectionsCard,
    date: date
  }
}

function receiveProjections(date, projections) {
  return {
    type: ActionTypes.ReceiveProjectionsCard,
    date,
    projections
  }
}

export function fetchProjectionsCard(date) {
  return function (dispatch) {
    dispatch(requestProjections(date))

    const _date = date.format('YYYY-MM-DD')

    model.get(
      ['projectionsByDate', _date, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', _date, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => {
        const projections = response.json.projectionsByDate[_date]
        dispatch(receiveProjections(date, projections))
      }
    )
  }
}

function requestPlannedTxnsCard() {
  return {
    type: ActionTypes.RequestPlannedTxnsCard,
  }
}

function receivePlannedTxnsCard(plannedTxns) {
  return {
    type: ActionTypes.ReceivePlannedTxnsCard,
    plannedTxns
  }
}

export function fetchPlannedTxnsCard(date) {
  return function (dispatch) {
    dispatch(requestPlannedTxnsCard())

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const plannedTxns = response.json.plannedTransactions
        dispatch(receivePlannedTxnsCard(plannedTxns))
      }
    )
  }
}
