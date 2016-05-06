var router = require('express').Router()
var u = require('updeep')

var accountAppState = require('../accountAppState')

router.get('/:appKey', (req, res) => {
  if (req.account.id) {
    accountAppState.get(req.account.id, req.params.appKey, (state) => {
      res.status(200).send(newState)
    })
  } else {
    res.status(401).send()
  }
})

router.patch('/:appKey', (req, res) => {
  if (req.account.id) {
    accountAppState.get(req.account.id, req.params.appKey, (state) => {
      const newState = u(req.body, state)

      accountAppState.set(req.account.id, req.params.appKey, newState, () => {
        res.status(200).send(newState)
      })
    })
  } else {
    res.status(401).send()
  }
})

module.exports = router
