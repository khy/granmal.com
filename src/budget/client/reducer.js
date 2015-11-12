import moment from 'moment'
import u from 'updeep'

import { ActionTypes } from './actions'

const initialState = {
  overview: {
    activeModal: null,
    lastAddedPlannedTxnGuid: null,
    addPlannedTxnModal: {
      isFetching: false
    },
    plannedTxnsCard: {
      plannedTxns: [],
      isFetching: false
    },
    projectionsCard: {
      date: moment().add(1, 'month').startOf('month').format(),
      projections: [],
      isFetching: false
    },
    txnsCard: {
      txns: [],
      isFetching: false
    },
  }
}

export default function reducer(state = initialState, action) {

  function update(obj) {
    return u({ overview: obj }, state)
  }

  switch (action.type) {

    case ActionTypes.HideModal:
      return update({
        activeModal: null
      })

    case ActionTypes.ReceiveNewPlannedTxn:
      return update({
        activeModal: null,
        lastAddedPlannedTxnGuid: action.guid,
        addPlannedTxnModal: {
          isFetching: false
        }
      })

    case ActionTypes.ReceivePlannedTxnsCard:
      return update({
        plannedTxnsCard: {
          plannedTxns: action.plannedTxns,
          isFetching: false
        }
      })

    case ActionTypes.ReceiveProjectionsCard:
      return update({
        projectionsCard: {
          date: action.date.format(),
          projections: action.projections,
          isFetching: false
        }
      })

    case ActionTypes.ReceiveTxnsCard:
      return update({
        txnsCard: {
          txns: action.txns,
          isFetching: false
        }
      })

    case ActionTypes.RequestNewPlannedTxn:
      return update({
        addPlannedTxnModal: {
          isSubmitting: true
        }
      })

    case ActionTypes.RequestPlannedTxnsCard:
      return update({
        plannedTxnsCard: {
          isFetching: true
        }
      })

    case ActionTypes.RequestProjectionsCard:
      return update({
        projectionsCard: {
          date: action.date.format(),
          isFetching: true
        }
      })

    case ActionTypes.RequestTxnsCard:
      return update({
        txnsCard: {
          isFetching: true
        }
      })

    case ActionTypes.ShowAddPlannedTxnModal:
      return update({
        activeModal: 'addPlannedTxnModal'
      })

    default:
      return state
  }
}
