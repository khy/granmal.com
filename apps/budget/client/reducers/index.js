import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'

import app from './app'
import overview from './overview'
import plannedTxns from './plannedTxns'

export default combineReducers({ app, auth, overview, plannedTxns })
