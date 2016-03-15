"use strict"

var express = require('express')
var router = express.Router()
var pg = require('pg')
var u = require('updeep')

var baseConfig = require('../../..//server/config')
var config = require('./config')

function getAccountAppState(accountId, appKey, cb) {
  pg.connect(baseConfig.pg.url, (err, client, done) => {
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

function setAccountAppState(accountId, appKey, state, cb) {
  pg.connect(baseConfig.pg.url, (err, client, done) => {
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

router.patch('/accountAppState', (req, res) => {
  getAccountAppState(req.account.id, 'budget', (state) => {
    const newState = u(req.body, state)

    setAccountAppState(req.account.id, 'budget', newState, () => {
      res.status(200).send(newState)
    })
  })
})

router.get('*', (req, res) => {
  const render = (initialState) => {
    res.render('appBase', {
      key: 'budget',
      title: 'Budget',
      initialState,
    })
  }

  let initialState = {
    config
  }

  if (req.account) {
    initialState.auth = {
      account: req.account.public
    }

    getAccountAppState(req.account.id, 'budget', (state) => {
      if (state.selectedContextGuid) {
        initialState.app = {
          selectedContextGuid: state.selectedContextGuid
        }
      }

      render(initialState)
    })
  } else {
    render(initialState)
  }
})

module.exports = router
