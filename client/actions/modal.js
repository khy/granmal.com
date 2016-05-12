export const DisableModal = 'DisableModal'
export const EnableModal = 'EnableModal'
export const HideModal = 'HideModal'
export const ShowModal = 'ShowModal'
export const UpdateModal = 'UpdateModal'

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

export function updateModal(data) {
  return { type: UpdateModal, data }
}
