import moment from 'moment'
import u from 'updeep'

import { ActionTypes, UserActionTypes } from '../actions/overview'

const AT = ActionTypes

export const initialState = {
  activeModal: null,
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
  lastUserAction: null,
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

export default function overview(state = initialState, action) {

  function update(obj) {
    return u(obj, state)
  }

  switch (action.type) {

    case AT.AddAccountReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.AddAccount,
          name: action.name,
        },
        addAccountModal: {
          isFetching: false,
        },
      })

    case AT.AddAccountRequest:
      return update({
        addAccountModal: {
          isFetching: true,
        },
      })

    case AT.AddTransferReceive:
      return update({
        activeModal: null,
        lastUserAction: {
          type: UserActionTypes.AddTransfer,
          guid: action.guid,
        },
        addTransferModal: {
          isFetching: false
        }
      })

    case AT.AddTransferRequest:
      return update({
        addTransferModal: {
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

    case AT.AddTxnTypeReceive:
    return update({
      activeModal: null,
      lastUserAction: {
        type: UserActionTypes.AddTxnType,
        name: action.name,
      },
      addTxnTypeModal: {
        isFetching: false
      }
    })

    case AT.AddTxnTypeRequest:
      return update({ addTxnTypeModal: { isFetching: true } })

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
          plannedTxns: action.plannedTxns,
          isFetching: false,
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
          projections: action.projections,
          isFetching: false,
        }
      })

    case AT.ProjectionsCardRequest:
      return update({
        projectionsCard: {
          date: action.date,
          isFetching: true
        }
      })

    case AT.ShowAddAccountModal:
      return update({
        activeModal: 'addAccountModal'
      })

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

    case AT.ShowAddTransferModal:
      return update({
        activeModal: 'addTransferModal',
      })

    case AT.ShowAddTxnModal:
      return update({
        activeModal: 'addTxnModal'
      })

    case AT.ShowAddTxnTypeModal:
      return update({
        activeModal: 'addTxnTypeModal'
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
          txns: action.txns,
          isFetching: false,
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
