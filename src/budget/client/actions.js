import moment from 'moment'
import model from './model'

export const ActionTypes = {
  HideModal: 'HideModal',
  ReceiveAddPlannedTxn: 'ReceiveAddPlannedTxn',
  ReceiveAddTxn: 'ReceiveAddTxn',
  ReceiveAdjustTxn: 'ReceiveAdjustTxn',
  ReceiveConfirmPlannedTxn: 'ReceiveConfirmPlannedTxn',
  ReceiveDeletePlannedTxn: 'ReceiveDeletePlannedTxn',
  ReceiveDeleteTxn: 'ReceiveDeleteTxn',
  ReceiveModel: 'ReceiveModel',
  ReceivePlannedTxnsCard: 'ReceivePlannedTxnsCard',
  ReceiveProjectionsCard: 'ReceiveProjectionsCard',
  ReceiveTxnsCard: 'ReceiveTxnsCard',
  RequestAddPlannedTxn: 'RequestAddPlannedTxn',
  RequestAddTxn: 'RequestAddTxn',
  RequestAdjustTxn: 'RequestAdjustTxn',
  RequestConfirmPlannedTxn: 'RequestConfirmPlannedTxn',
  RequestDeletePlannedTxn: 'RequestDeletePlannedTxn',
  RequestDeleteTxn: 'RequestDeleteTxn',
  RequestPlannedTxnsCard: 'RequestPlannedTxnsCard',
  RequestProjectionsCard: 'RequestProjectionsCard',
  RequestTxnsCard: 'RequestTxnsCard',
  ShowAddPlannedTxnModal: 'ShowAddPlannedTxnModal',
  ShowResolvePlannedTxnModal: 'ShowResolvePlannedTxnModal',
  ShowAddTxnModal: 'ShowAddTxnModal',
  ShowAdjustTxnModal: 'ShowAdjustTxnModal',
}

export const UserActionTypes = {
  AddPlannedTxn: 'AddPlannedTxn',
  AddTxn: 'AddTxn',
  AdjustTxn: 'AdjustTxn',
  ConfirmPlannedTxn: 'ConfirmPlannedTxn',
  DeletePlannedTxn: 'DeletePlannedTxn',
  DeleteTxn: 'DeleteTxn'
}

export function addPlannedTxn(newPlannedTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestAddPlannedTxn
    })

    model.call('plannedTransactions.add', [newPlannedTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveAddPlannedTxn,
          guid: response.json.plannedTransactions.latest.guid
        })
      }
    )
  }
}

export function addTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestAddTxn
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveAddTxn,
          guid: response.json.transactions.latest.guid
        })
      }
    )
  }
}

export function adjustTxn(guid, newTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestAdjustTxn
    })

    model.call('transactions.adjust', [guid, newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveAdjustTxn,
          oldGuid: guid,
          newGuid: response.json.transactions.latest.guid,
        })
      }
    )
  }
}

export function confirmPlannedTxn(newTxn) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestConfirmPlannedTxn
    })

    model.call('transactions.add', [newTxn], [['guid']]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveConfirmPlannedTxn,
          plannedTxnGuid: newTxn.plannedTransactionGuid,
          txnGuid: response.json.transactions.latest.guid
        })
      }
    )
  }
}

export function deletePlannedTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestDeletePlannedTxn
    })

    model.call('plannedTransactions.delete', [guid]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchPlannedTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveDeletePlannedTxn,
          guid: guid
        })
      }
    )
  }
}

export function deleteTxn(guid) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestDeleteTxn
    })

    model.call('transactions.delete', [guid]).then(
      response => {
        dispatch(fetchProjectionsCard(null, true))
        dispatch(fetchTxnsCard(true))
        dispatch({
          type: ActionTypes.ReceiveDeleteTxn,
          guid: guid
        })
      }
    )
  }
}

export function fetchAccounts() {
  return function (dispatch) {
    model.get(
      ['accounts', {from: 0, to: 9}, ['guid', 'name']]
    ).then(
      response => {
        dispatch({
          type: ActionTypes.ReceiveModel,
          model: response.json,
        })
      }
    )
  }
}

export function fetchPlannedTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestPlannedTxnsCard
    })

    if (force) { model.invalidate(['plannedTransactions']) }

    model.get(
      ['plannedTransactions', {from: 0, to: 9}, ['guid', 'minTimestamp', 'maxTimestamp', 'minAmount', 'maxAmount']],
      ['plannedTransactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['plannedTransactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const plannedTxns = response ? response.json.plannedTransactions : []

        dispatch({
          type: ActionTypes.ReceivePlannedTxnsCard,
          plannedTxns
        })
      }
    )
  }
}

export function fetchProjectionsCard(date, force = false) {
  return function (dispatch, getState) {
    const _date = moment(date || getState().overview.projectionsCard.date)

    dispatch({
      type: ActionTypes.RequestProjectionsCard,
      date: _date
    })

    const formattedDate = _date.format('YYYY-MM-DD')

    if (force) { model.invalidate(['projectionsByDate', formattedDate]) }

    model.get(
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, ['minBalance', 'maxBalance']],
      ['projectionsByDate', formattedDate, {from: 0, to: 9}, 'account', ['name', 'balance']]
    ).then(
      response => {
        const projections = response ? response.json.projectionsByDate[formattedDate] : []

        dispatch({
          type: ActionTypes.ReceiveProjectionsCard,
          date: _date,
          projections
        })
      }
    )
  }
}

export function fetchTxnsCard(force = false) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.RequestTxnsCard
    })

    if (force) { model.invalidate(['transactions']) }

    model.get(
      ['transactions', {from: 0, to: 9}, ['guid', 'timestamp', 'amount']],
      ['transactions', {from: 0, to: 9}, 'transactionType', ['guid', 'name']],
      ['transactions', {from: 0, to: 9}, 'account', ['guid', 'name']]
    ).then(
      response => {
        const txns = response ? response.json.transactions : []

        dispatch({
          type: ActionTypes.ReceiveTxnsCard,
          txns
        })
      }
    )
  }
}

export function fetchTxnTypes() {
  return function (dispatch) {
    model.get(
      ['transactionTypes', {from: 0, to: 50}, ['guid', 'name']]
    ).then(
      response => {
        dispatch({
          type: ActionTypes.ReceiveModel,
          model: response.json
        })
      }
    )
  }
}
