"use strict"

var express = require('express');
var router = express.Router();

var api = require('./api')

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
