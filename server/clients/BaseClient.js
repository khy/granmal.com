"use strict"

var request = require('request-promise')

class BaseClient {

  constructor(baseUrl, auth) {
    this.baseUrl = baseUrl
    this.auth = auth
  }

  fullPath(path) {
    return this.baseUrl + path
  }

  get(path, qs) {
    return request({
      uri: this.fullPath(path),
      qs: qs,
      headers: {
        'Authorization': this.auth
      },
      json: true,
      resolveWithFullResponse: true,
    })
  }

  post(path, body) {
    return request({
      method: 'POST',
      uri: this.fullPath(path),
      headers: {
        'Authorization': this.auth,
        'Content-Type': 'application/json'
      },
      body: body,
      json: true
    })
  }

  delete(path) {
    return request({
      method: 'DELETE',
      uri: this.fullPath(path),
      headers: {
        'Authorization': this.auth
      }
    })
  }

}

module.exports = BaseClient
