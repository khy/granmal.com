import moment from 'moment'
import u from 'updeep'

import { ActionTypes, UserActionTypes } from '../actions/overview'

const AT = ActionTypes

export const initialState = {
  lastUserAction: null,
  plannedTxnsCard: {
    plannedTxns: [],
    isFetching: false,
  },
  projectionsCard: {
    date: moment().add(1, 'month').startOf('month').format(),
    projections: [],
    isFetching: false,
  },
}

export default function overview(state = initialState, action) {

  function update(obj) {
    return u(obj, state)
  }

  switch (action.type) {

    case AT.AddAccountReceive:
      return update({
        lastUserAction: {
          type: UserActionTypes.AddAccount,
          name: action.name,
        },
      })

    case AT.AddTransferReceive:
      return update({
        lastUserAction: {
          type: UserActionTypes.AddTransfer,
          guid: action.guid,
        },
      })

    case AT.ConfirmPlannedTxnReceive:
      return update({
        lastUserAction: {
          type: UserActionTypes.ConfirmPlannedTxn,
          plannedTxnGuid: action.plannedTxnGuid,
          txnGuid: action.txnGuid,
        },
      })

    case AT.DeletePlannedTxnReceive:
      return update({
        lastUserAction: {
          type: UserActionTypes.DeletePlannedTxn,
          guid: action.guid,
        },
      })

    case AT.PlannedTxnsCardReceive:
      return update({
        plannedTxnsCard: {
          plannedTxns: action.plannedTxns,
          isFetching: false,
        }
      })

    case AT.PlannedTxnsCardRequest:
      return update({
        plannedTxnsCard: {
          isFetching: true
        }
      })

    case AT.ProjectionsCardReceive:
      return update({
        projectionsCard: {
          projections: action.projections,
          isFetching: false,
        }
      })

    case AT.ProjectionsCardRequest:
      return update({
        projectionsCard: {
          date: action.date,
          isFetching: true
        }
      })

    default:
      return state

  }

}
