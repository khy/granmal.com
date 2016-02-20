'use strict'

var pg = require('pg')

var config = require('../config')

class RichAccount {
  constructor(raw) {
    this.raw = raw
  }

  get public() {
    return this.raw
  }

  get uselessAccessToken() {
    console.log(this.raw)
    return this.raw.access_tokens.find( accessToken => {
      return accessToken.oauth_provider === 'useless'
    })
  }
}

const auth = (req, res, next) => {
  const accountGuid = req.cookies['GRANMAL_ACCOUNT_GUID']

  if (accountGuid) {
    pg.connect(config.pg.url, (err, client, done) => {
      client.query('select * from accounts where guid = $1', [accountGuid], (err, result) => {
        done()
        const account = result.rows[0]

        if (account) {
          client.query('select * from access_tokens where account_id = $1', [account.id], (err, result) => {
            account.access_tokens = result.rows
            console.log('auth: Logged in as ' + account.handle)
            req.account = new RichAccount(account)
            next()
          })
        } else {
          console.log('auth: No account for \'GRANMAL_ACCOUNT_GUID\' cookie')
          next()
        }
      })
    })
  } else {
    console.log('auth: No \'GRANMAL_ACCOUNT_GUID\' cookie')
    next()
  }
}

module.exports = auth
