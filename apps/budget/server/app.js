"use strict"

var router = require('express').Router()

var accountAppState = require('../../../server/accountAppState')
var config = require('./config')

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
