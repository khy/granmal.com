"use strict"

var router = require('express').Router()

var config = require('./config')

router.get('*', (req, res) => {
  let initialState = {
    config
  }

  if (req.account) {
    initialState.auth = {
      account: req.account.public
    }
  }

  res.render('appBase', {
    key: 'haiku',
    title: 'Haiku',
    initialState,
  })
})

module.exports = router
