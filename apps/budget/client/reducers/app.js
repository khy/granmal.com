import u from 'updeep'

import { ActionTypes } from '../actions/app'

const AT = ActionTypes

export const initialState = {
  isBootstrapping: false,
  isBootstrapped: false,
  prestitialDismissed: false,
  accounts: [],
  accountTypes: [],
  contexts: [],
  txnTypes: [],
}

export default function app(state = initialState, action) {

  switch (action.type) {

    case AT.BootstrapReceived:
      return u({ isBootstrapping: false, isBootstrapped: true }, state)

    case AT.BootstrapRequested:
      return u({ isBootstrapping: true }, state)

    case AT.DismissPrestitial:
      return u({ prestitialDismissed: true }, state)

    case AT.SetAccounts:
      return u({ accounts: action.accounts }, state)

    case AT.SetAccountTypes:
      return u({ accountTypes: action.accountTypes }, state)

    case AT.SetContexts:
      return u({ contexts: action.contexts }, state)

    case AT.SetTxnTypes:
      return u({ txnTypes: action.txnTypes }, state)

    default:
      return state

  }

}
