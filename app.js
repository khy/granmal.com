var express = require('express')
var FalcorServer = require('falcor-express')
var FalcorRouter = require('falcor-router')
var app = express()

app.use(express.static('./public'))

var data = {
  apps: [
    {
      name: 'Budget',
      description: 'Personal finances for obsessive compulsives.',
      path: '/budget'
    },
    {
      name: 'Haikunst',
      description: 'Like Twitter, but with haikus.',
      path: '/haikunst'
    }
  ]
}

var Router = FalcorRouter.createClass([
  {
    route: 'apps[{integers:appIndexes}][{keys:appKeys}]',
    get: (pathSet) => {
      var results = []
      pathSet.appIndexes.forEach ( appIndex => {
        if (data.apps.length > appIndex) {
          pathSet.appKeys.forEach ( appKey => {
            results.push({
              path: ['apps', appIndex, appKey],
              value: data.apps[appIndex][appKey]
            })
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
