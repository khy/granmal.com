var router = require('express').Router()
var pg = require('pg')
var bcrypt = require('bcrypt')
var uuid = require('node-uuid')
const _find = require('lodash/find')

var config = require('../config')
var TrustedUselessClient = require('../clients/TrustedUselessClient')

router.post('/session', (req, res) => {
  pg.connect(config.pg.url, (err, client, done) => {
    client.query('select * from accounts where email = $1', [req.body.email], (err, result) => {
      done()
      const account = result.rows[0]

      bcrypt.compare(req.body.password, account.password_hash, (err, match) => {
        if (match) {
          client.query('select * from access_tokens where account_id = $1', [account.id], (err, result) => {
            account.access_tokens = result.rows

            ensureUselessAccessToken(account, (account) => {
              res.
                cookie('GRANMAL_ACCOUNT_GUID', account.guid, { httpOnly: true }).
                status(201).
                send(account)
            })
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
        const newAccountId = result.rows[0].id

        getAccountForId(newAccountId, (account) => {
          ensureUselessAccessToken(account, (accountWithUselessAccessToken) => {
            res.
              cookie('GRANMAL_ACCOUNT_GUID', account.guid, { httpOnly: true }).
              status(201).
              send(accountWithUselessAccessToken)
          })
        })
      })
    })
  })
})

const trustedUselessClient = new TrustedUselessClient(config)

function ensureUselessAccessToken(account, cb) {
  const uselessAccessToken = _find(account.access_tokens, (accessToken) => {
    return accessToken.oauth_provider === 'useless'
  })

  if (uselessAccessToken) {
    cb(account)
  } else {
    trustedUselessClient.getUserByEmail(account.email).then((uselessUser) => {
      if (uselessUser) {
        createUselessAccessToken(account, uselessUser, () => {
          getAccountForId(account.id, cb)
        })
      } else {
        trustedUselessClient.createUser(account.email, account.handle, account.name).then((uselessUser) => {
          createUselessAccessToken(account, uselessUser, () => {
            getAccountForId(account.id, cb)
          })
        })
      }
    })
  }
}

function createUselessAccessToken(account, uselessUser, cb) {
  trustedUselessClient.createAccessToken(uselessUser.guid).then((accessToken) => {
    pg.connect(config.pg.url, (err, client, done) => {
      const insert = (
        `INSERT INTO access_tokens (account_id, oauth_provider, resource_owner_id, token, scopes, created_by)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
      )

      const values = [
        account.id,
        'useless',
        accessToken.resource_owner.guid,
        accessToken.guid,
        accessToken.scopes,
        account.id
      ]

      client.query(insert, values, (err, result) => {
        done()
        cb(result.rows.id)
      })
    })
  })
}

function getAccountForId(id, cb) {
  pg.connect(config.pg.url, (err, client, done) => {
    client.query('select * from accounts where id = $1', [id], (err, result) => {
      const account = result.rows[0]

      client.query('select * from access_tokens where account_id = $1', [account.id], (err, result) => {
        done()
        account.access_tokens = result.rows
        cb(account)
      })
    })
  })
}

module.exports = router
