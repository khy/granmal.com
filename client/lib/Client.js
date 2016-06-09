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

  post(path, json, fullResponse = false) {
    const response = fetch(this.url(path), {
      method: 'post',
      headers: {
        'Authorization': this.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
    })

    if (fullResponse) {
      return response
    } else {
      return response.then((response) => {
        return response.json()
      })
    }
  }

  put(path, json, fullResponse = false) {
    let params = {
      method: 'put',
      headers: {
        'Authorization': this.authorization,
        'Accept': 'application/json',
      },
    }

    if (json) {
      params.body = JSON.stringify(json)
      params.header['Content-Type'] = 'application/json'
    }

    const response = fetch(this.url(path), params)

    if (fullResponse) {
      return response
    } else {
      return response.then((response) => {
        return response.json()
      })
    }
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
