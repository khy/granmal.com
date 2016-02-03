import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'

import config from 'budget/client/config'

export class UselessClient {

  constructor(baseUrl, authorization) {
    this.baseUrl = baseUrl
    this.authorization = authorization
  }

  get(path, fullResponse = false) {
    const response = fetch(this.baseUrl + path, {
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
    return fetch(this.baseUrl + path, {
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

}

export default new UselessClient(config.uselessBaseUrl, config.uselessAccessToken.token)
