var Falcor = require('falcor')
var FalcorRouter = require('falcor-router')
var request = require('request-promise')

var $ref = Falcor.Model.ref;

var httpGet = (path) => {
  return request({
    uri: 'http://localhost:8999/budget' + path ,
    headers: {
      'Authorization': '71a6828a-d20f-4fa6-8b2b-05a254487bda'
    },
    json: true
  })
}

var Router = FalcorRouter.createClass([
  {
    route: 'accounts[{integers:indices}]',
    get: (pathSet) => {
      return httpGet('/accounts').then(
        accounts => {
          var results = []

          pathSet.indices.forEach ( index => {
            if (accounts[index]) {
              results.push({
                path: ['accounts', index],
                value: $ref(['accountsByGuid', accounts[index].guid])
              })
            }
          })

          return results
        }
      )
    }
  },
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
    route: 'transactionTypes[{integers:indices}]',
    get: (pathSet) => {
      return httpGet('/transactionTypes').then(
        transactionTypes => {
          var results = []

          pathSet.indices.forEach ( index => {
            if (transactionTypes[index]) {
              results.push({
                path: ['transactionTypes', index],
                value: $ref(['transactionTypesByGuid', transactionTypes[index].guid])
              })
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
    route: 'projectionsByDate[{keys:dates}][{integers:indices}][{keys:attributes}]',
    get: (pathSet) => {
      const date = pathSet.dates[0]

      return httpGet('/projections?date=' + date).then(
        projections => {
          var results = []

          pathSet.indices.forEach ( index => {
            if (projections[index]) {
              pathSet.attributes.forEach ( attribute => {
                var value

                if (attribute === 'account') {
                  value = $ref(['accountsByGuid', projections[index].account.guid])
                } else {
                  value = projections[index][attribute]
                }

                results.push({
                  path: ['projectionsByDate', date, index, attribute],
                  value: value
                })
              })
            }
          })

          return results
        }
      )
    }
  },
  {
    route: 'plannedTransactions.add',
    call: (pathSet) => {
      console.log(pathSet)
    }
  },
  {
    route: 'plannedTransactions[{integers:indices}][{keys:attributes}]',
    get: (pathSet) => {
      return httpGet('/plannedTransactions').then(
        plannedTransactions => {
          var results = []
          var _plannedTransactions = plannedTransactions.filter ( plannedTransaction => {
            return (typeof plannedTransaction.transactionGuid === 'undefined')
          })

          pathSet.indices.forEach ( index => {
            if (_plannedTransactions[index]) {
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
                  path: ['plannedTransactions', index, attribute],
                  value: value
                })
              })
            }
          })

          return results
        }
      )
    }
  },
  {
    route: 'transactions[{integers:indices}][{keys:attributes}]',
    get: (pathSet) => {
      return httpGet('/transactions').then(
        transactions => {
          var results = []

          pathSet.indices.forEach ( index => {
            if (transactions[index]) {
              pathSet.attributes.forEach ( attribute => {
                var value

                if (attribute === 'transactionType') {
                  value = $ref(['transactionTypesByGuid', transactions[index]['transactionTypeGuid']])
                } else if (attribute === 'account') {
                  value = $ref(['accountsByGuid', transactions[index]['accountGuid']])
                } else {
                  value = transactions[index][attribute]
                }

                results.push({
                  path: ['transactions', index, attribute],
                  value: value
                })
              })
            }
          })

          return results
        }
      )
    }
  }
])

module.exports = Router
