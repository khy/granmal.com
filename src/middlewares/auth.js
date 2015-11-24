var MongoClient = require('mongodb').MongoClient

const auth = (req, res, next) => {
  MongoClient.connect('mongodb://localhost/granmal_dev', (err, db) => {
    const collection = db.collection('accounts')

    collection.find({handle: 'khy'}).toArray((err, docs) => {
      db.close()
      const account = docs[0]
      console.log('Logged in as ' + account.handle)
      req.account = account
      next()
    })
  })
}

module.exports = auth
