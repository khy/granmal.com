var model = require('./model')

export const REQUEST_PROJECTIONS = 'REQUEST_PROJECTIONS'
export const RECEIVE_PROJECTIONS = 'RECEIVE_PROJECTIONS'

export function requestProjections(date) {
  return {
    type: REQUEST_PROJECTIONS,
    date: date,
    isFetching: true
  }
}

export function receiveProjections(date, projections) {
  return {
    type: RECEIVE_PROJECTIONS,
    date,
    projections,
    isFetching: false
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
