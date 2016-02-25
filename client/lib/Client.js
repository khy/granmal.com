import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'

export default class Client {

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
