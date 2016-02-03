"use strict"

var express = require('express');
var router = express.Router();

var config = require('./config')

router.get('*', (req, res) => {
  let clientConfig = {
    uselessBaseUrl: config.useless.baseUrl,
  }

  if (req.account) {
    clientConfig.uselessAccessToken = req.account.uselessAccessToken
    clientConfig.account = req.account.public
  }

  res.render('appBase', {
    key: 'budget',
    title: 'Budget',
    config: clientConfig,
  })
})

module.exports = router
