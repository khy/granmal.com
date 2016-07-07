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
    key: 'bookClub',
    title: 'Book Club',
    initialState,
  })
})

module.exports = router
