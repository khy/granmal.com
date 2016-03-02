import _find from 'lodash/collection/find'

import Client from 'client/lib/Client'
import { uselessBearerToken } from 'budget/client/lib/authAccount'

export function budgetClient(state) { return uselessClient(state, 'budget') }
export function coreClient(state) { return uselessClient(state, 'core') }

let clients = {}

function uselessClient(state, api) {
  if (!clients[api]) {
    clients[api] = new Client(
      state.config.useless.urls[api],
      uselessBearerToken(state.auth.account)
    )
  }

  return clients[api]
}
