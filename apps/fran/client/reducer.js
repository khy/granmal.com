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

    default:
      return state

  }

}

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  alert, app, auth, config, modal
})
