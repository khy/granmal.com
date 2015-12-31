var express = require('express');
var router = express.Router();

var Client = require('./client')

const proxyGet = (fromPath, toPath) => {
  router.get(fromPath, (req, res) => {
    const client = new Client(req.account)
    const _fromPath = toPath || fromPath
    client.get(_fromPath).then ( results => res.json(results) )
  })
}

proxyGet('/accounts')
proxyGet('/accountTypes')
proxyGet('/txnTypes', '/transactionTypes')
proxyGet('/plannedTxns', '/plannedTransactions')

module.exports = router
