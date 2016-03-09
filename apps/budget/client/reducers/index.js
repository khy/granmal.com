import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'

import account from './account'
import app from './app'
import contexts from './contexts'
import modal from './modal'
import month from './month'
import overview from './overview'
import plannedTxns from './plannedTxns'
import txnTypes from './txnTypes'

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  account, app, auth, config, contexts, month, modal, overview, plannedTxns, txnTypes
})
