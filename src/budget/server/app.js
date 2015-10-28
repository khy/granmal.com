var Falcor = require('falcor')
var FalcorRouter = require('falcor-router')
var request = require('request-promise')

var $ref = Falcor.Model.ref;

var httpGet = (path) => {
  return request({
    uri: 'http://localhost:8999/budget' + path ,
    headers: {
      'Authorization': 'ACCESS-TOKEN'
    },
    json: true
  })
}

var Router = FalcorRouter.createClass([
  {
    route: 'accountsByGuid[{keys:guids}][{keys:attributes}]',
    get: (pathSet) => {
      return httpGet('/accounts').then(
        accounts => {
          var results = []

          pathSet.guids.forEach ( guid => {
            var account = accounts.find ( account => account.guid === guid )

            if (account) {
              pathSet.attributes.forEach ( attribute =>
                results.push({
                  path: ['accountsByGuid', guid, attribute],
                  value: account[attribute]
                })
              )
            }
          })

          return results
        }
      )
    }
  },
  {
    route: 'transactionTypesByGuid[{keys:guids}][{keys:attributes}]',
    get: (pathSet) => {
      return httpGet('/transactionTypes').then(
        transactionTypes => {
          var results = []

          pathSet.guids.forEach ( guid => {
            var transactionType = transactionTypes.find ( transactionType => {
              return (transactionType.guid === guid)
            })

            if (transactionType) {
              pathSet.attributes.forEach ( attribute =>
                results.push({
                  path: ['transactionTypesByGuid', guid, attribute],
                  value: transactionType[attribute]
                })
              )
            }
          })

          return results
        }
      )
    }
  },
  {
    route: 'pendingTransactions[{integers:indices}][{keys:attributes}]',
    get: (pathSet) => {
      return httpGet('/plannedTransactions').then(
        plannedTransactions => {
          var results = []
          var _plannedTransactions = plannedTransactions.filter ( plannedTransaction => {
            console.log(plannedTransaction)
            return (typeof plannedTransaction.transactionGuid === 'undefined')
          })

          pathSet.indices.forEach ( index => {
            pathSet.attributes.forEach ( attribute => {
              var value

              if (attribute === 'transactionType') {
                value = $ref(['transactionTypesByGuid', _plannedTransactions[index]['transactionTypeGuid']])
              } else if (attribute === 'account') {
                value = $ref(['accountsByGuid', _plannedTransactions[index]['accountGuid']])
              } else {
                value = _plannedTransactions[index][attribute]
              }

              results.push({
                path: ['pendingTransactions', index, attribute],
                value: value
              })
            })
          })

          return results
        }
      )
    }
  }
])

module.exports = Router
