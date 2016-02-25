import { budgetClient as client } from 'budget/client/lib/clients'

export const ActionTypes = {
  MonthTxnTypeRollupReceive: 'MonthTxnTypeRollupReceive',
  MonthTxnTypeRollupRequest: 'MonthTxnTypeRollupRequest',
}

const AT = ActionTypes

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
