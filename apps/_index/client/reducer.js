import { combineReducers } from 'redux'
import u from 'updeep'

import auth from 'client/reducers/auth'

import { ActionTypes as AT } from './actions'

function index(state = {}, action) {

  switch (action.type) {

    case AT.Alert:
      return u({alert: action.alert}, state)

    default:
      return state

  }

}

export default combineReducers({ auth, index })
