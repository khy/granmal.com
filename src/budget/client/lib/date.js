var moment = require('moment')

export function normalizeDateInput(raw) {
  return moment(raw, ["MM|DD|YYYY"]).format()
}

export function formatDate(momentOrDateString) {
  return moment(momentOrDateString).format('MM/DD/YY')
}
