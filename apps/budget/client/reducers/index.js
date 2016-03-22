import { combineReducers } from 'redux'

import auth from 'client/reducers/auth'

import account from './account'
import app from './app'
import contexts from './contexts'
import modal from './modal'
import months from './months'
import overview from './overview'
import plannedTxns from './plannedTxns'
import txns from './txns'
import txnTypes from './txnTypes'

const emptyReducer = (state = {}, action) => state
const config = emptyReducer

export default combineReducers({
  account, app, auth, config, contexts, months, modal, overview, plannedTxns, txns, txnTypes
})
