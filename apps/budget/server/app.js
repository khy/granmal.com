"use strict"

var express = require('express');
var router = express.Router();

var api = require('./api')

router.use((req, res, next) => {
  if (req.account && req.account.uselessAccessToken) {
    next()
  } else {
    res.status(401).send("Must be logged in, and have useless.io access token.")
  }
})

router.use('/api', api)

router.get('*', (req, res) => {
  let initialState = { auth: {} }

  if (req.account) {
    initialState.auth.account = req.account.public
  }

  res.render('appBase', {
    key: 'budget',
    title: 'Budget',
    initialState,
  })
})

module.exports = router
