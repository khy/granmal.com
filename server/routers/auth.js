var router = require('express').Router()
var pg = require('pg')
var bcrypt = require('bcrypt')
var config = require('../config')

router.post('/session', (req, res) => {
  pg.connect(config.pg.url, (err, client, done) => {
    client.query('select * from accounts where email = $1', [req.body.email], (err, result) => {
      done()
      const account = result.rows[0]

      bcrypt.compare(req.body.password, account.password_hash, (err, match) => {
        if (match) {
          client.query('select * from access_tokens where account_id = $1', [account.id], (err, result) => {
            account.access_tokens = result.rows

            res.
              cookie('GRANMAL_ACCOUNT_GUID', account.guid, { httpOnly: true }).
              status(201).
              send(account)
          })
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
