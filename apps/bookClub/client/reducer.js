import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'
import modal from 'client/reducers/modal'

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  auth, config, modal
})
