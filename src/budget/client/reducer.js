import moment from 'moment'
import u from 'updeep'

import { ActionTypes, UserActionTypes } from './actions'

const AT = ActionTypes

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

    case AT.AddPlannedTxnReceive:
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

    case AT.AddPlannedTxnRequest:
      return update({
        addPlannedTxnModal: {
          isFetching: true
        }
      })

    case AT.AddTxnReceive:
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

    case AT.AddTxnRequest:
      return update({
        addTxnModal: {
          isFetching: true
        }
      })

    case AT.AdjustTxnReceive:
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

    case AT.AdjustTxnRequest:
      return update({
        adjustTxnModal: {
          isFetching: true
        }
      })

    case AT.ConfirmPlannedTxnReceive:
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

    case AT.ConfirmPlannedTxnRequest:
      return update({
        resolvePlannedTxnModal: {
          isFetching: true
        }
      })

    case AT.DeletePlannedTxnReceive:
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

    case AT.DeletePlannedTxnRequest:
      return update({
        resolvePlannedTxnModal: {
          isFetching: true
        }
      })

    case AT.DeleteTxnReceive:
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

    case AT.DeleteTxnRequest:
      return update({
        adjustTxnModal: {
          isFetching: true
        }
      })

    case AT.HideModal:
      return update({
        activeModal: null
      })

    case AT.PlannedTxnsCardReceive:
      return update({
        plannedTxnsCard: {
          isFetching: false
        }
      })

    case AT.PlannedTxnsCardRequest:
      return update({
        plannedTxnsCard: {
          isFetching: true
        }
      })

    case AT.ProjectionsCardReceive:
      return update({
        projectionsCard: {
          isFetching: false
        }
      })

    case AT.ProjectionsCardRequest:
      return update({
        projectionsCard: {
          date: action.date,
          isFetching: true
        }
      })

    case AT.ReceiveModel:
      return u({
        model: action.model
      }, state)

    case AT.ShowAddPlannedTxnModal:
      return update({
        activeModal: 'addPlannedTxnModal'
      })

    case AT.ShowResolvePlannedTxnModal:
      return update({
        activeModal: 'resolvePlannedTxnModal',
        resolvePlannedTxnModal: {
          plannedTxn: action.plannedTxn
        }
      })

    case AT.ShowAddTxnModal:
      return update({
        activeModal: 'addTxnModal'
      })

    case AT.ShowAdjustTxnModal:
      return update({
        activeModal: 'adjustTxnModal',
        adjustTxnModal: {
          txn: action.txn
        }
      })

    case AT.TxnsCardReceive:
      return update({
        txnsCard: {
          isFetching: false
        }
      })

    case AT.TxnsCardRequest:
      return update({
        txnsCard: {
          isFetching: true
        }
      })

    default:
      return state
  }
}
