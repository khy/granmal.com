var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var FalcorServer = require('falcor-express')

var auth = require('./src/middlewares/auth')
var Budget = require('./src/budget/server/app')
var RootRouter = require('./src/root/server/app')

var app = express()

app.set('view engine', 'jade')
app.set('views', './src/views')

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))

app.use(auth)
app.use(express.static('./public'))

app.use('/budget', Budget)
app.use('/root.json', FalcorServer.dataSourceRoute(() => new RootRouter()))

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
