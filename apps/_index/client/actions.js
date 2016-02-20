export const ActionTypes = {
  Alert: 'Alert'
}

export function alertSuccess(message) {
  return {
    type: ActionTypes.Alert,
    alert: { context: 'success', message },
  }
}

export function alertWarning(message) {
  return {
    type: ActionTypes.Alert,
    alert: { context: 'warning', message },
  }
}
