import moment from 'moment'

import { ActionTypes } from './actions'

const initialState = {
  projectionsCard: {
    date: moment().add(1, 'month').startOf('month'),
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
      return Object.assign({}, state, {
        projectionsCard: Object.assign({}, state.projectionsCard, {
          date: action.date,
          isFetching: true
        })
      })
    case ActionTypes.ReceiveProjectionsCard:
      return Object.assign({}, state, {
        projectionsCard: Object.assign({}, state.projectionsCard, {
          date: action.date,
          projections: action.projections,
          isFetching: false
        })
      })
    case ActionTypes.RequestPlannedTxnsCard:
      return Object.assign({}, state, {
        plannedTxnsCard: Object.assign({}, state.plannedTxnsCard, {
          isFetching: true
        })
      })
    case ActionTypes.ReceivePlannedTxnsCard:
      return Object.assign({}, state, {
        plannedTxnsCard: Object.assign({}, state.plannedTxnsCard, {
          plannedTxns: action.plannedTxns,
          isFetching: false
        })
      })
    default:
      return state
  }
}
