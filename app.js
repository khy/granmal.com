var express = require('express')
var FalcorServer = require('falcor-express')
var FalcorRouter = require('falcor-router')
var app = express()

app.use(express.static('./public'))

var data = {
  apps: [
    {name: 'Budget'},
    {name: 'Haikunst'},
    {name: 'Book Club'}
  ]
}

var Router = FalcorRouter.createClass([
  {
    route: 'apps[{integers:appIndexes}]["name"]',
    get: (pathSet) => {
      var results = [];
      pathSet.appIndexes.forEach(appIndex => {
        if (data.apps.length > appIndex) {
          results.push({
            path: ['apps', appIndex, 'name'],
            value: data.apps[appIndex].name
          })
        }
      })
      return results
    }
  },
  {
    route: 'apps.length',
    get: () => {
      return {path: ['apps', 'length'], value: data.apps.length}
    }
  }
])

app.use('/model.json', FalcorServer.dataSourceRoute(() => new Router()))

app.listen(3000, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('listening at http://localhost:3000')
})
