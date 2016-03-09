export const ActionTypes = {
  DisableModal: 'DisableModal',
  EnableModal: 'EnableModal',
  HideModal: 'HideModal',
  ShowModal: 'ShowModal',
}

export function disableModal() {
  return { type: ActionTypes.DisableModal }
}

export function enableModal() {
  return { type: ActionTypes.EnableModal }
}

export function hideModal() {
  return { type: ActionTypes.HideModal }
}

export function showModal(name, data) {
  return { type: ActionTypes.ShowModal, name, data }
}
