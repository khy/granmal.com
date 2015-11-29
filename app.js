var express = require('express')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var authMiddleware = require('./server/middleware/auth')

var Budget = require('./apps/budget/server/app')

var AuthRouter = require('./server/routers/auth')
var BaseRouter = require('./server/routers/base')

var app = express()

app.set('view engine', 'jade')
app.set('views', './server/views')

app.use(express.static('./public'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(authMiddleware)

app.use('/budget', Budget)

app.use('/auth', AuthRouter)
app.use('/', BaseRouter)

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
