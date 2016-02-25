import _find from 'lodash/collection/find'

import Client from 'client/lib/Client'

let client

export default function client(state) {
  if (!client) {
    const uselessAccessToken = _find(state.auth.account.access_tokens, (accessToken) => {
      return accessToken.oauth_provider === 'useless'
    })

    if (uselessAccessToken) {
      client = new Client(state.config.useless.urls.budget, uselessAccessToken.token)
    }
  }

  return client
}
