"use strict"

var router = require('express').Router()

router.get('/', (req, res) => {
  let initialState = {}

  if (req.account) {
    initialState.auth = {
      account: req.account.public,
    }
  }

  res.render('appBase', {
    key: 'index',
    title: 'Gran Mal',
    initialState,
  })
})

module.exports = router
