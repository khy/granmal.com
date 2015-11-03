var express = require('express')
var bodyParser = require('body-parser')
var FalcorServer = require('falcor-express')

var BudgetRouter = require('./src/budget/server/app')
var RootRouter = require('./src/root/server/app')

var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use('/budget.json', FalcorServer.dataSourceRoute(() => new BudgetRouter()))
app.use('/root.json', FalcorServer.dataSourceRoute(() => new RootRouter()))

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
