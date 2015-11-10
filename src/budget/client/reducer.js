import moment from 'moment'

import { REQUEST_PROJECTIONS, RECEIVE_PROJECTIONS } from './actions'

const initialState = {
  projectionsDate: moment().add(1, 'month').startOf('month'),
  projections: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROJECTIONS:
      return Object.assign({}, state, {
        projectionsDate: action.date
      })
    case RECEIVE_PROJECTIONS:
      return Object.assign({}, state, {
        projectionsDate: action.date,
        projections: action.projections
      })
    default:
      return state
  }
}
