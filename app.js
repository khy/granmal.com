var express = require('express')
var FalcorServer = require('falcor-express')

var RootRouter = require('./src/root/server/app')

var app = express()

app.use(express.static('./public'))
app.use('/root.json', FalcorServer.dataSourceRoute(() => new RootRouter()))

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
