import moment from 'moment'
import u from 'updeep'

import { ActionTypes, UserActionTypes } from './actions'

const initialState = {
  model: {},
  overview: {
    activeModal: null,
    lastUserAction: null,
    addPlannedTxnModal: {
      isFetching: false,
    },
    addTxnModal: {
      isFetching: false,
    },
    adjustTxnModal: {
      txn: null,
      isFetching: false,
    },
    plannedTxnsCard: {
      isFetching: false,
    },
    projectionsCard: {
      date: moment().add(1, 'month').startOf('month').format(),
      isFetching: false,
    },
    resolvePlannedTxnModal: {
      plannedTxn: null,
      isFetching: false,
    },
    txnsCard: {
      isFetching: false,
    },
  }
}

export default function reducer(state = initialState, action) {

  function update(obj) {
    return u({ overview: obj }, state)
  }

  switch (action.type) {

    case ActionTypes.AddPlannedTxnReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.AddPlannedTxn,
          guid: action.guid,
        },
        addPlannedTxnModal: {
          isFetching: false
        }
      })

    case ActionTypes.AddPlannedTxnRequest:
      return update({
        addPlannedTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.AddTxnReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.AddTxn,
          guid: action.guid,
        },
        addTxnModal: {
          isFetching: false
        }
      })

    case ActionTypes.AddTxnRequest:
      return update({
        addTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.AdjustTxnReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.AdjustTxn,
          oldGuid: action.oldGuid,
          newGuid: action.newGuid,
        },
        adjustTxnModal: {
          isFetching: false
        }
      })

    case ActionTypes.AdjustTxnRequest:
      return update({
        adjustTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.ConfirmPlannedTxnReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.ConfirmPlannedTxn,
          plannedTxnGuid: action.plannedTxnGuid,
          txnGuid: action.txnGuid,
        },
        resolvePlannedTxnModal: {
          plannedTxn: null,
          isFetching: false
        }
      })

    case ActionTypes.ConfirmPlannedTxnRequest:
      return update({
        resolvePlannedTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.DeletePlannedTxnReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.DeletePlannedTxn,
          guid: action.guid,
        },
        resolvePlannedTxnModal: {
          plannedTxn: null,
          isFetching: false
        }
      })

    case ActionTypes.DeletePlannedTxnRequest:
      return update({
        resolvePlannedTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.DeleteTxnReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.DeleteTxn,
          guid: action.guid,
        },
        adjustTxnModal: {
          txn: null,
          isFetching: false
        }
      })

    case ActionTypes.DeleteTxnRequest:
      return update({
        adjustTxnModal: {
          isFetching: true
        }
      })

    case ActionTypes.HideModal:
      return update({
        activeModal: null
      })

    case ActionTypes.PlannedTxnsCardReceive:
      return update({
        plannedTxnsCard: {
          isFetching: false
        }
      })

    case ActionTypes.PlannedTxnsCardRequest:
      return update({
        plannedTxnsCard: {
          isFetching: true
        }
      })

    case ActionTypes.ProjectionsCardReceive:
      return update({
        projectionsCard: {
          isFetching: false
        }
      })

    case ActionTypes.ProjectionsCardRequest:
      return update({
        projectionsCard: {
          date: action.date,
          isFetching: true
        }
      })

    case ActionTypes.ReceiveModel:
      return u({
        model: action.model
      }, state)

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

    case ActionTypes.ShowAdjustTxnModal:
      return update({
        activeModal: 'adjustTxnModal',
        adjustTxnModal: {
          txn: action.txn
        }
      })

    case ActionTypes.TxnsCardReceive:
      return update({
        txnsCard: {
          isFetching: false
        }
      })

    case ActionTypes.TxnsCardRequest:
      return update({
        txnsCard: {
          isFetching: true
        }
      })

    default:
      return state
  }
}
