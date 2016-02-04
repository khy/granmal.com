import client from 'budget/client/lib/client'

export const ActionTypes = {
  MonthTxnTypeRollupReceive: 'MonthTxnTypeRollupReceive',
  MonthTxnTypeRollupRequest: 'MonthTxnTypeRollupRequest',
}

const AT = ActionTypes

export function fetchMonthTxnTypeRollup(moment) {
  return function (dispatch) {
    dispatch({type: AT.MonthTxnTypeRollupRequest, month: moment.format("YY-MM")})

    const fromDate = moment.format("YYYY-MM-01")
    const toDate = moment.add(1, "months").format("YYYY-MM-01")

    client.get(`/aggregates/transactionTypeRollups?fromDate=${fromDate}&toDate=${toDate}`).then( rollups => {
      dispatch({
        type: AT.MonthTxnTypeRollupReceive,
        month: moment.format("YY-MM"),
        rollups: rollups,
      })
    })
  }
}
