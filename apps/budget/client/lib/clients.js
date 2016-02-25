import _find from 'lodash/collection/find'

import Client from 'client/lib/Client'

export function budgetClient(state) { return uselessClient(state, 'budget') }
export function coreClient(state) { return uselessClient(state, 'core') }

let clients = {}

function uselessClient(state, api) {
  if (!clients[api]) {
    const uselessAccessToken = _find(state.auth.account.access_tokens, (accessToken) => {
      return accessToken.oauth_provider === 'useless'
    })

    if (uselessAccessToken) {
      clients[api] = new Client(state.config.useless.urls[api], uselessAccessToken.token)
    }
  }

  return clients[api]
}
