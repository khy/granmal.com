'use strict'

var MongoClient = require('mongodb').MongoClient

class RichAccount {
  constructor(rawAccount) {
    this.rawAccount = rawAccount
  }

  get uselessAccessToken() {
    account.access_tokens.find((accessToken =>
      accessToken.oauth_provider === 'useless'
    ))
  }
}

const auth = (req, res, next) => {
  const accountGuid = req.cookies['GRANMAL_ACCOUNT_GUID']

  if (accountGuid) {
    MongoClient.connect('mongodb://localhost/granmal_dev', (err, db) => {
      const collection = db.collection('accounts')

      collection.find({_id: accountGuid}).toArray((err, docs) => {
        db.close()
        const account = docs[0]

        if (account) {
          console.log('auth: Logged in as ' + account.handle)
          req.account = new RichAccount(account)
        } else {
          console.log('auth: No account for \'GRANMAL_ACCOUNT_GUID\' cookie')
        }

        next()
      })
    })
  } else {
    console.log('auth: No \'GRANMAL_ACCOUNT_GUID\' cookie')
    next()
  }
}

module.exports = auth
