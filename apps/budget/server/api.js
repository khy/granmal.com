var express = require('express');
var router = express.Router();

var Client = require('./client')

const proxyGet = (fromPath, toPath) => {
  router.get(fromPath, (req, res) => {
    const client = new Client(req.account)
    const _toPath = toPath || fromPath
    client.get(_toPath).then ( results => res.json(results) )
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

proxyGet('/accounts')
proxyPost('/accounts')
proxyGet('/accountTypes')
proxyGet('/plannedTxns', '/plannedTransactions')
proxyPost('/plannedTxns', '/plannedTransactions')
proxyPost('/transfers')
proxyGet('/txns', '/transactions')
proxyPost('/txns', '/transactions')
proxyGet('/txnTypes', '/transactionTypes')
proxyPost('/txnTypes', '/transactionTypes')

module.exports = router
