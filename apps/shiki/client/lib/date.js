var moment = require('moment')

export function formatHaikuListDate(momentOrDateString) {
  return moment(momentOrDateString).format('MM/DD/YY')
}
