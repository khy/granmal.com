import { budgetClient as client } from 'budget/client/lib/clients'

export const ActionTypes = {
  MonthRollupsReceive: 'MonthRollupsReceive',
  MonthRollupRequest: 'MonthRollupRequest',
  MonthTxnTypeRollupReceive: 'MonthTxnTypeRollupReceive',
  MonthTxnTypeRollupRequest: 'MonthTxnTypeRollupRequest',
}

const AT = ActionTypes

export function fetchMonthRollups() {
  return function (dispatch, getState) {
    dispatch({type: AT.MonthRollupRequest})

    const state = getState()
    let url = '/aggregates/monthRollups'

    if (state.app.selectedContextGuid) {
      url = url + `?contextGuid=${contextGuid}`
    }

    client(state).get(url).then( rollups => {
      dispatch({
        type: AT.MonthRollupsReceive,
        rollups
      })
    })
  }
}

export function fetchMonthTxnTypeRollup(moment) {
  return function (dispatch, getState) {
    dispatch({type: AT.MonthTxnTypeRollupRequest, month: moment.format("YY-MM")})

    const fromDate = moment.format("YYYY-MM-01")
    const toDate = moment.add(1, "months").format("YYYY-MM-01")

    client(getState()).get(`/aggregates/transactionTypeRollups?fromDate=${fromDate}&toDate=${toDate}`).then( rollups => {
      dispatch({
        type: AT.MonthTxnTypeRollupReceive,
        month: moment.format("YY-MM"),
        rollups: rollups,
      })
    })
  }
}
