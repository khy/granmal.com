var router = require('express').Router()

router.get('/', (req, res) => {
  res.render('appBase', { key: 'index', title: 'Gran Mal' })
})

var MongoClient = require('mongodb').MongoClient
var bcrypt = require('bcrypt')

router.post('/sessions', (req, res) => {
  MongoClient.connect('mongodb://localhost/granmal_dev', (err, db) => {
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

module.exports = router
