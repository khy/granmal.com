export const HideAlert = 'HideAlert'
export const ShowNamedAlert = 'ShowNamedAlert'
export const ShowAdHocAlert = 'ShowAdHocAlert'

export function hideAlert() {
  return { type: HideAlert }
}

export function showNamedAlert(name, data) {
  return { type: ShowNamedAlert, name, data }
}

export function showAdHocAlert(context, text) {
  return { type: ShowAdHocAlert, context, text }
}
