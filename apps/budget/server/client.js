"use strict"

var request = require('request-promise')

var config = require('./config')

class Client {

  constructor(account) {
    this.auth = account.uselessAccessToken.token
  }

  static fullPath(path) {
    return config.useless.baseUrl + path
  }

  get(path, qs) {
    return request({
      uri: Client.fullPath(path),
      qs: qs,
      headers: {
        'Authorization': this.auth
      },
      json: true
    })
  }

  post(path, body) {
    return request({
      method: 'POST',
      uri: Client.fullPath(path),
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
      uri: Client.fullPath(path),
      headers: {
        'Authorization': this.auth
      }
    })
  }

}

module.exports = Client
