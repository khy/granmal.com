import moment from 'moment'
import u from 'updeep'

import { ActionTypes } from './actions'

const initialState = {
  projectionsCard: {
    date: moment().add(1, 'month').startOf('month').format(),
    projections: [],
    isFetching: false
  },
  plannedTxnsCard: {
    plannedTxns: [],
    isFetching: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.RequestProjectionsCard:
      return u({
        projectionsCard: {
          date: action.date.format(),
          isFetching: true
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

    case ActionTypes.RequestPlannedTxnsCard:
      return u({
        plannedTxnsCard: {
          isFetching: true
        }
      }, state)

    case ActionTypes.ReceivePlannedTxnsCard:
      return u({
        plannedTxnsCard: {
          plannedTxns: action.plannedTxns,
          isFetching: false
        }
      }, state)

    default:
      return state
  }
}
