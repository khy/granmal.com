"use strict"

var express = require('express');
var router = express.Router();

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
    key: 'budget',
    title: 'Budget',
    initialState,
  })
})

module.exports = router
