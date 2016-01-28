var express = require('express');
var router = express.Router();

var Client = require('./client')

const proxyGet = (fromPath, toPath) => {
  router.get(fromPath, (req, res) => {
    const client = new Client(req.account)
    const _toPath = toPath || fromPath
    client.get(_toPath, req.query).then ( response => {
      res.
        append('X-Useless-Link', response.headers.link).
        json(response.body)
    })
  })
}

const proxyPost = (fromPath, toPath) => {
  router.post(fromPath, (req, res) => {
    const client = new Client(req.account)
    const _toPath = toPath || fromPath
    client.post(_toPath, req.body).then((results) => {
      res.status(201).json(results)
    })
  })
}

router.use((req, res, next) => {
  if (req.account && req.account.uselessAccessToken) {
    next()
  } else {
    res.status(401).send("Must be logged in, and have useless.io access token.")
  }
})

proxyGet('/accounts')
proxyPost('/accounts')
proxyGet('/accountTypes')
proxyGet('/plannedTxns', '/plannedTransactions')
proxyPost('/plannedTxns', '/plannedTransactions')
proxyGet('/projections')
proxyPost('/transfers')
proxyGet('/txns', '/transactions')
proxyPost('/txns', '/transactions')
proxyGet('/txnTypes', '/transactionTypes')
proxyPost('/txnTypes', '/transactionTypes')

router.post('/txns/:guid/adjustments', (req, res) => {
  const client = new Client(req.account)

  client.post('/transactions/' + req.params.guid + '/adjustments', req.body).then((results) => {
    res.status(201).json(results)
  })
})

router.post('/txnTypes/:guid/adjustments', (req, res) => {
  const client = new Client(req.account)

  client.post('/transactionTypes/' + req.params.guid + '/adjustments', req.body).then((results) => {
    res.status(201).json(results)
  })
})

router.delete('/plannedTxns/:guid', (req, res) => {
  const client = new Client(req.account)

  client.delete('/plannedTransactions/' + req.params.guid).then(() => {
    res.status(204).send()
  })
})

router.delete('/txns/:guid', (req, res) => {
  const client = new Client(req.account)

  client.delete('/transactions/' + req.params.guid).then(() => {
    res.status(204).send()
  })
})

module.exports = router
