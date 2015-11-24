var express = require('express')
var bodyParser = require('body-parser')
var FalcorServer = require('falcor-express')

var BudgetRouter = require('./src/budget/server/app')
var RootRouter = require('./src/root/server/app')

var app = express()

const authenticator = (req, res, next) => {
  req.account = {
    auth: '71a6828a-d20f-4fa6-8b2b-05a254487bda'
  }
  next()
}

app.use(authenticator)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use('/budget.json', BudgetRouter)
app.use('/root.json', FalcorServer.dataSourceRoute(() => new RootRouter()))

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
