import moment from 'moment'
import u from 'updeep'

import { ActionTypes } from './actions'

const initialState = {
  isAddingPlannedTxn: false,
  plannedTxnsCard: {
    plannedTxns: [],
    isFetching: false
  },
  projectionsCard: {
    date: moment().add(1, 'month').startOf('month').format(),
    projections: [],
    isFetching: false
  },
  txnsCard: {
    txns: [],
    isFetching: false
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ActionType.CommitNewPlannedTxn:
      return u({
        isAddingPlannedTxn: false,
        lastAddedPlannedTxn: action.guid
      }, state)

    case ActionTypes.ReceivePlannedTxnsCard:
      return u({
        plannedTxnsCard: {
          plannedTxns: action.plannedTxns,
          isFetching: false
        }
      }, state)

    case ActionTypes.ReceiveProjectionsCard:
      return u({
        projectionsCard: {
          date: action.date.format(),
          projections: action.projections,
          isFetching: false
        }
      }, state)

    case ActionTypes.ReceiveTxnsCard:
      return u({
        txnsCard: {
          txns: action.txns,
          isFetching: false
        }
      }, state)

    case ActionTypes.RequestPlannedTxnsCard:
      return u({
        plannedTxnsCard: {
          isFetching: true
        }
      }, state)

    case ActionTypes.RequestProjectionsCard:
      return u({
        projectionsCard: {
          date: action.date.format(),
          isFetching: true
        }
      }, state)

    case ActionTypes.RequestTxnsCard:
      return u({
        txnsCard: {
          isFetching: true
        }
      }, state)

    case ActionTypes.SubmitNewPlannedTxn:
      return u({
        isAddingPlannedTxn: true
      }, state)

    default:
      return state
  }
}
