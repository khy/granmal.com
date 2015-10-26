var FalcorRouter = require('falcor-router')

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

module.exports = Router
