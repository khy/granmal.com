export const DisableModal = 'DisableModal'
export const EnableModal = 'EnableModal'
export const HideModal = 'HideModal'
export const ShowModal = 'ShowModal'

export function disableModal() {
  return { type: DisableModal }
}

export function enableModal() {
  return { type: EnableModal }
}

export function hideModal() {
  return { type: HideModal }
}

export function showModal(name, data) {
  return { type: ShowModal, name, data }
}
