"use strict"

var express = require('express');
var router = express.Router();

var falcorRouter = require('./falcorRouter')

router.use((req, res, next) => {
  if (req.account && req.account.uselessAccessToken) {
    next()
  } else {
    res.status(401).send("Must be logged in, and have useless.io access token.")
  }
})

router.use('/model.json', falcorRouter)

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
