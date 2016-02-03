import client from 'budget/client/lib/uselessClient'

export const ActionTypes = {
  MonthTxnTypeRollupReceive: 'MonthTxnTypeRollupReceive',
  MonthTxnTypeRollupRequest: 'MonthTxnTypeRollupRequest',
}

const AT = ActionTypes

export function fetchMonthTxnTypeRollup(year, month) {
  return function (dispatch) {
    dispatch({ type: AT.MonthTxnTypeRollupRequest, month: `${year}-${month}` })

    // TODO: Remove obvious bug
    const fromDate = `${year}-${month}-01`
    const toDate = `${year}-${parseInt(month) + 1}-01`

    client.get(`/aggregates/transactionTypeRollups?fromDate=${fromDate}&toDate=${toDate}`).then( rollups => {
      dispatch({
        type: AT.MonthTxnTypeRollupReceive,
        month: `${year}-${month}`,
        rollups: rollups,
      })
    })
  }
}
