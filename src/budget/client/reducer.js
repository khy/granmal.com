import moment from 'moment'

import {SET_PROJECTIONS_DATE} from './actions'

const initialState = {
  projectionsDate: moment().add(1, 'month').startOf('month'),
  projections: []
}

export default function budget(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTIONS_DATE:
      return Object.assign({}, state, {
        projectionsDate: action.date
      })
    default:
      return state
  }
}
