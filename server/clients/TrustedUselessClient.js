"use strict"

const BaseClient = require('./BaseClient')

class TrustedUselessClient {

  constructor(config) {
    this.baseClient = new BaseClient(
      config.useless.urls.core,
      config.useless.accessToken
    )
  }

  getUserByEmail(email) {
    return this.baseClient.get('/accounts', { email }).then((results) => results[0])
  }

  createUser(email, handle, name) {
    return this.baseClient.post('/users', { email, handle, name })
  }

  createAccessToken(accountGuid) {
    return this.baseClient.post(`/accounts/${accountGuid}/access_tokens`, {})
  }

}

module.exports = TrustedUselessClient
