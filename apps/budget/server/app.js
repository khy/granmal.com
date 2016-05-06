"use strict"

var express = require('express')
var router = express.Router()
var u = require('updeep')

var accountAppState = require('../../../server/accountAppState')
var config = require('./config')

router.patch('/accountAppState', (req, res) => {
  accountAppState.get(req.account.id, 'budget', (state) => {
    const newState = u(req.body, state)

    accountAppState.set(req.account.id, 'budget', newState, () => {
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

    accountAppState.get(req.account.id, 'budget', (state) => {
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
