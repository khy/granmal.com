"use strict"

var express = require('express');
var router = express.Router();

var api = require('./api')
var config = require('./config')

router.use('/api', api)

router.get('*', (req, res) => {
  let initialState = { auth: {} }

  if (req.account) {
    initialState.auth.account = req.account.public
  }

  res.render('appBase', {
    key: 'budget',
    title: 'Budget',
    config: {
      useless: {
        baseUrl: config.useless.baseUrl,
        auth: req.account.uselessAccessToken
      }
    },
    initialState,
  })
})

module.exports = router
