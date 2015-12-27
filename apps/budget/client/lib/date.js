var moment = require('moment')

export function normalizeDateInput(raw) {
  return moment(raw, ["MM|DD|YYYY"]).format('YYYY-MM-DD')
}

export function formatDate(momentOrDateString) {
  return moment(momentOrDateString).format('MM/DD/YY')
}

export function formatDateForModel(momentOrDateString) {
  return moment(momentOrDateString).format('YYYY-MM-DD')
}
