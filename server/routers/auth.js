var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient
var bcrypt = require('bcrypt')
var config = require('../config')

router.post('/session', (req, res) => {
  MongoClient.connect(config.mongo.url, (err, db) => {
    const collection = db.collection('accounts')

    collection.find({ email: req.body.email }).toArray((err, docs) => {
      db.close()
      const account = docs[0]

      bcrypt.compare(req.body.password, account.password, (err, match) => {
        if (match) {
          res.
            cookie('GRANMAL_ACCOUNT_GUID', account._id, { httpOnly: true }).
            status(201).
            send(account)
        } else {
          res.
            status(401).
            send("Invalid email / password combination")
        }
      });
    })
  })
})

router.delete('/session', (req, res) => {
  res.
    clearCookie('GRANMAL_ACCOUNT_GUID', { httpOnly: true }).
    status(204).
    send()
})

module.exports = router
