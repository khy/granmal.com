var express = require('express');
var router = express.Router();

var Client = require('./client')

router.get('/plannedTxns', (req, res) => {
  const client = new Client(req.account)

  client.get('/plannedTransactions').then ( plannedTxns => {
    res.json(plannedTxns)
  })
})

module.exports = router
