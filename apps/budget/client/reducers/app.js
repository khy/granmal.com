import u from 'updeep'

import { ActionTypes } from '../actions/app'

const AT = ActionTypes

export const initialState = {
  isBootstrapped: false,
  prestitialDismissed: false,
  accounts: [],
  accountTypes: [],
  txnTypes: [],
}

export default function app(state = initialState, action) {

  switch (action.type) {

    case AT.BootstrapReceived:
      return u({ isBootstrapped: true }, state)

    case AT.DismissPrestitial:
      return u({ prestitialDismissed: true }, state)

    case AT.SetAccounts:
      return u({ accounts: action.accounts }, state)

    case AT.SetAccountTypes:
      return u({ accountTypes: action.accountTypes }, state)

    case AT.SetTxnTypes:
      return u({ txnTypes: action.txnTypes }, state)

    default:
      return state

  }

}
