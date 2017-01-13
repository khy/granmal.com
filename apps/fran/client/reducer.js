import { combineReducers } from 'redux'
import u from 'updeep'

import alert from 'client/reducers/alert'
import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const initialState = {
  newMovement: {
    isPending: false,
    editions: {
      isPending: false,
      records: [],
    },
  },
  newWorkout: {
    movementOptions: {
      isPending: false,
      records: []
    }
  }
}

function app(state = initialState, action) {

  switch (action.type) {

    case 'newMovement.add.send':
      return u({
        newMovement: { isPending: true }
      }, state)

    case 'newMovement.add.success':
      return u({
        newMovement: { isPending: false }
      }, state)

    case 'newWorkout.movementOptions.fetch.send':
      return u({
        newWorkout: { movementOptions: {
          isPending: true,
          taskIndex: action.taskIndex,
        }}
      }, state)

    case 'newWorkout.movementOptions.fetch.success':
      return u({
        newWorkout: { movementOptions: {
          isPending: false,
          taskIndex: action.taskIndex,
          records: action.movements,
        }}
      }, state)

    default:
      return state

  }

}

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  alert, app, auth, config, modal
})
