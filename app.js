var express = require('express')
var app = express()

app.use(express.static('./public'))

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
