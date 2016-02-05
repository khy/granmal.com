import _filter from 'lodash/collection/filter'
import _find from 'lodash/collection/find'
import _flatten from 'lodash/array/flatten'
import _map from 'lodash/collection/map'

export function systemTxnType(txnTypes) {
  return (name) => {
    return _find(txnTypes, (txnType) => {
      return txnType.ownership === "system" && txnType.name === name
    })
  }
}

export function txnTypeHierarchyArray(txnTypes) {
  return (parent) => {
    const buildHierarchy = (parent, level = 0) => {
      const children = _filter(txnTypes, (txnType) => {
        return txnType.parentGuid === parent.guid
      })

      const successors = _flatten(_map(children, (txnType) => {
        return buildHierarchy(txnType, level + 1)
      }))

      return [{txnType: parent, level}].concat(successors)
    }

    return buildHierarchy(parent)
  }
}
