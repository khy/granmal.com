import moment from 'moment'
import u from 'updeep'

import { ActionTypes } from './actions'

const initialState = {
  overview: {
    activeModal: null,
    lastAddedPlannedTxnGuid: null,
    lastAddedTxnGuid: null,
    lastConfirmedPlannedTxnGuid: null,
    lastDeletedPlannedTxnGuid: null,
    addPlannedTxnModal: {
      isFetching: false,
    },
    addTxnModal: {
      isFetching: false,
    },
    plannedTxnsCard: {
      plannedTxns: [],
      isFetching: false,
    },
    projectionsCard: {
      date: moment().add(1, 'month').startOf('month').format(),
      projections: [],
      isFetching: false,
    },
    resolvePlannedTxnModal: {
      plannedTxn: null,
      isFetching: false,
    },
    txnsCard: {
      txns: [],
      isFetching: false,
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

    case ActionTypes.ReceiveAddPlannedTxn:
      return update({
        activeModal: null,
        lastAddedPlannedTxnGuid: action.guid,
        addPlannedTxnModal: {
          isFetching: false
        }
      })

    case ActionTypes.ReceiveAddTxn:
      return update({
        activeModal: null,
        lastAddedTxnGuid: action.guid,
        addTxnModal: {
          isFetching: false
        }
      })

    case ActionTypes.ReceiveConfirmPlannedTxn:
      return update({
        activeModal: null,
        lastConfirmedPlannedTxnGuid: action.guid,
        resolvePlannedTxnModal: {
          plannedTxn: null,
          isFetching: false
        }
      })

    case ActionTypes.ReceiveDeletePlannedTxn:
      return update({
        activeModal: null,
        lastDeletedPlannedTxnGuid: action.guid,
        resolvePlannedTxnModal: {
          plannedTxn: null,
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

    case ActionTypes.RequestAddPlannedTxn:
      return update({
        addPlannedTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.RequestAddTxn:
      return update({
        addTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.RequestConfirmPlannedTxn:
      return update({
        resolvePlannedTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.RequestDeletePlannedTxn:
      return update({
        resolvePlannedTxnModal: {
          isFetching: true
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

    case ActionTypes.ShowResolvePlannedTxnModal:
      return update({
        activeModal: 'resolvePlannedTxnModal',
        resolvePlannedTxnModal: {
          plannedTxn: action.plannedTxn
        }
      })

    case ActionTypes.ShowAddTxnModal:
      return update({
        activeModal: 'addTxnModal'
      })

    default:
      return state
  }
}
