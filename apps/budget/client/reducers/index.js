import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'

import app from './app'
import overview from './overview'

export default combineReducers({ auth, app, overview })
