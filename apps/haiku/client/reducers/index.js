import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

import app from './app'

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  app, auth, config, modal
})
