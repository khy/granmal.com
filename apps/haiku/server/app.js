"use strict"

var express = require('express')
var router = express.Router()
var u = require('updeep')

var baseConfig = require('../../../server/config')
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

    render(initialState)
  } else {
    render(initialState)
  }
})

module.exports = router
