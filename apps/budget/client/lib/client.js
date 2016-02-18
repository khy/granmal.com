import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'
import _find from 'lodash/collection/find'

import config from 'budget/client/config'

export class Client {

  constructor(baseUrl, authorization) {
    this.baseUrl = baseUrl
    this.authorization = authorization
  }

  url(path) { return this.baseUrl + path }

  get(path, fullResponse = false) {
    const response = fetch(this.url(path), {
      method: 'get',
      headers: {
        'Authorization': this.authorization,
        'Accept': 'application/json',
      },
    })

    if (fullResponse) {
      return response
    } else {
      return response.then((response) => {
        return response.json()
      })
    }
  }

  post(path, json) {
    return fetch(this.url(path), {
      method: 'post',
      headers: {
        'Authorization': this.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    }).then((response) => {
      return response.json()
    })
  }

  delete(path) {
    return fetch(this.url(path), {
      method: 'delete',
      headers: {
        'Authorization': this.authorization,
      },
    })
  }

}

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
