import _map from 'lodash/collection/map'
import _flatten from 'lodash/array/flatten'
import _filter from 'lodash/collection/filter'

export function txnTypeHierarchyArray(txnTypes, parent) {
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
