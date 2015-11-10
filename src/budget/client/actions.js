var model = require('./model')

export const ActionTypes = {
  RequestProjections: 'REQUEST_PROJECTIONS',
  ReceiveProjections: 'RECEIVE_PROJECTIONS'
}

export function requestProjections(date) {
  return {
    type: ActionTypes.RequestProjections,
    date: date
  }
}

export function receiveProjections(date, projections) {
  return {
    type: ActionTypes.ReceiveProjections,
    date,
    projections
  }
}

export function fetchProjections(date) {
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
