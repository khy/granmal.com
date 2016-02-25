import _find from 'lodash/collection/find'

import Client from 'client/lib/Client'
import config from 'budget/client/config'

let client

export default function client(state) {
  if (
    !client &&
    config && config.uselessBaseUrl &&
    state && state.auth && state.auth.account
  ) {
    const uselessAccessToken = _find(state.auth.account.access_tokens, (accessToken) => {
      return accessToken.oauth_provider === 'useless'
    })

    if (uselessAccessToken) {
      client = new Client(config.uselessBaseUrl, uselessAccessToken.token)
    }
  }

  if (!client) {
    throw "Cannot instantiate Client due to unmet preconditions"
  }

  return client
}
