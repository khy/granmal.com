"use strict"

var pg = require('pg')
var config = require('./config')

function get(accountId, appKey, cb) {
  pg.connect(config.pg.url, (err, client, done) => {
    const select = (
      `SELECT state FROM account_app_states
       WHERE account_id = $1 and app_key = $2`
    )

    client.query(select, [accountId, appKey], (err, result) => {
      done()

      let state
      if (result.rows[0]) { state = result.rows[0].state }
      cb(state || {})
    })
  })
}

function set(accountId, appKey, state, cb) {
  pg.connect(config.pg.url, (err, client, done) => {
    const update = (
      `UPDATE account_app_states
       SET state = $1
       WHERE account_id = $2 and app_key = $3`
    )

    client.query(update, [state, accountId, appKey], (err, result) => {
      if (result.rowCount === 0) {
        const insert = (
          `INSERT INTO account_app_states (account_id, app_key, state)
           VALUES ($1, $2, $3) RETURNING id`
        )

        client.query(insert, [accountId, appKey, state], (err, result) => {
          done()
          cb()
        })
      } else {
        done()
        cb()
      }
    })
  })
}

module.exports = { get: get, set: set }
