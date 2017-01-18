import { combineReducers } from 'redux'
import Immutable from 'immutable'

import alert from 'client/reducers/alert'
import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = Immutable.fromJS({
  newMovement: {
    isPending: false,
    editions: {
      isPending: false,
      records: [],
    },
  },
  newWorkout: {
    movementOptions: []
  }
})

function app(state = initialState, action) {

  switch (action.type) {

    case 'newMovement.add.send':
      return state.setIn(['newMovement', 'isPending'], true)

    case 'newMovement.add.success':
      return state.setIn(['newMovement', 'isPending'], false)

    case 'newWorkout.movementOptions.fetch.send':
      return state.mergeIn(['newWorkout', 'movementOptions'], {
        isPending: true,
        taskIndex: action.taskIndex,
      })

    case 'newWorkout.movementOptions.fetch.success':
      return state.mergeIn(['newWorkout', 'movementOptions'], {
        isPending: false,
        taskIndex: action.taskIndex,
        records: action.movements,
      })

    default:
      return state

  }

}

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  alert, app, auth, config, modal
})
