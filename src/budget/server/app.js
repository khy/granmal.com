var FalcorRouter = require('falcor-router')


var Router = FalcorRouter.createClass([
  {
    route: 'pendingTransactions[{integers:indices}][{keys:attributes}]',
    get: (pathSet) => {
      var results = []
      pathSet.indices.forEach ( index => {
        pathSet.attributes.forEach ( attribute => {
          results.push({
            path: ['pendingTransactions', index, attribute],
            value: "Value"
          })
        })
      })
      return results
    }
  }
])

module.exports = Router
