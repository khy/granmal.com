var express = require('express')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var authMiddleware = require('./server/middleware/auth')

var Budget = require('./apps/budget/server/app')
var Shiki = require('./apps/shiki/server/app')
var Index = require('./apps/_index/server')

var AccountAppStateRouter = require('./server/routers/accountAppState')
var AuthRouter = require('./server/routers/auth')

var app = express()

app.set('view engine', 'jade')
app.set('views', './server/views')

app.use(express.static('./public'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(authMiddleware)

app.use('/auth', AuthRouter)
app.use('/accountAppState', AccountAppStateRouter)

app.use('/budget', Budget)
app.use('/shiki', Shiki)
app.use('/', Index)

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
