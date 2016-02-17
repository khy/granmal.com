"use strict"

var router = require('express').Router()

router.get('/', (req, res) => {
  let clientConfig = {}

  if (req.account) {
    clientConfig.account = req.account.public
  }

  res.render('appBase', {
    key: 'index',
    title: 'Gran Mal',
    config: clientConfig,
  })
})

module.exports = router
