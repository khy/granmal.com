import moment from 'moment'

import { ActionTypes } from './actions'

const initialState = {
  projectionsCard: {
    date: moment().add(1, 'month').startOf('month'),
    projection: [],
    isFetching: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RequestProjections:
      return Object.assign({}, state, {
        projectionsCard: Object.assign({}, state.projectionsCard, {
          date: action.date,
          isFetching: true
        })
      })
    case ActionTypes.ReceiveProjections:
      return Object.assign({}, state, {
        projectionsCard: Object.assign({}, state.projectionsCard, {
          date: action.date,
          projections: action.projections,
          isFetching: false
        })
      })
    default:
      return state
  }
}
