var router = require('express').Router()
var pg = require('pg')
var bcrypt = require('bcrypt')
var uuid = require('node-uuid')

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

router.post('/accounts', (req, res) => {
  pg.connect(config.pg.url, (err, client, done) => {
    bcrypt.hash(req.body.password, 10, (err, passwordHash) => {
      const insert = (
        `INSERT INTO accounts (guid, email, handle, name, password_hash)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`
      )

      const values = [
        uuid.v4(),
        req.body.email,
        req.body.handle,
        req.body.name,
        passwordHash
      ]

      client.query(insert, values, (err, result) => {
        done()
        const id = result.rows[0].id

        client.query('select * from accounts where id = $1', [id], (err, result) => {
          done()
          const account = result.rows[0]

          res.
            cookie('GRANMAL_ACCOUNT_GUID', account.guid, { httpOnly: true }).
            status(201).
            send(account)
        })
      })
    })
  })
})

module.exports = router
