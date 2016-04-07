var moment = require('moment')

export function parseDateInput(raw) {
  return moment(raw, ["MM|DD|YYYY"])
}

export function normalizeDateInput(raw) {
  return parseDateInput(raw).format('YYYY-MM-DD')
}

export function normalizeOptionalDateInput(raw) {
  return (raw.length > 0) ? normalizeDateInput(raw) : undefined
}

export function formatDate(momentOrDateString) {
  return moment(momentOrDateString).format('MM/DD/YY')
}

export function formatDateForModel(momentOrDateString) {
  return moment(momentOrDateString).format('YYYY-MM-DD')
}
