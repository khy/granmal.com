import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'

import account from './account'
import app from './app'
import month from './month'
import overview from './overview'
import plannedTxns from './plannedTxns'
import txnTypes from './txnTypes'

export default combineReducers({ account, app, auth, month, overview, plannedTxns, txnTypes })
